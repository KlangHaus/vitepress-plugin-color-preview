interface RGB {
  r: number
  g: number
  b: number
}

interface HSL {
  h: number
  s: number
  l: number
}

// ── Color parsing (uses the browser's CSS engine) ──────────────────

function parseColorToRGB(color: string): RGB | null {
  const el = document.createElement('div')
  el.style.color = color
  el.style.display = 'none'
  document.body.appendChild(el)
  const computed = getComputedStyle(el).color
  document.body.removeChild(el)

  const match = computed.match(/rgba?\(\s*([\d.]+),?\s*([\d.]+),?\s*([\d.]+)/)
  if (match) {
    return {
      r: Math.round(parseFloat(match[1])),
      g: Math.round(parseFloat(match[2])),
      b: Math.round(parseFloat(match[3])),
    }
  }
  return null
}

// ── Color conversions ──────────────────────────────────────────────

function rgbToHex({ r, g, b }: RGB): string {
  const hex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  const h =
    max === rn
      ? ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
      : max === gn
        ? ((bn - rn) / d + 2) / 6
        : ((rn - gn) / d + 4) / 6

  return { h, s, l }
}

function formatRgb({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`
}

function formatHsl({ h, s, l }: HSL): string {
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

// ── WCAG contrast ──────────────────────────────────────────────────

function linearize(c: number): number {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function relativeLuminance({ r, g, b }: RGB): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrastRatio(c1: RGB, c2: RGB): number {
  const l1 = relativeLuminance(c1)
  const l2 = relativeLuminance(c2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function wcagLevel(ratio: number): string {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA18'
  return 'Fail'
}

function wcagBadge(ratio: number): string {
  const level = wcagLevel(ratio)
  const cls = level === 'Fail' ? 'fail' : level === 'AA18' ? 'aa18' : level === 'AAA' ? 'aaa' : 'aa'
  return `<span class="cpt-wcag cpt-wcag--${cls}">${level}</span>`
}

// ── Tooltip positioning ────────────────────────────────────────────

function positionTooltip(tooltip: HTMLElement, anchor: Element): void {
  const rect = anchor.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  let top = rect.top - tooltipRect.height - 8
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2

  // Keep within viewport
  if (top < 4) top = rect.bottom + 8
  if (left < 4) left = 4
  if (left + tooltipRect.width > window.innerWidth - 4) {
    left = window.innerWidth - tooltipRect.width - 4
  }

  tooltip.style.top = `${top + window.scrollY}px`
  tooltip.style.left = `${left + window.scrollX}px`
}

// ── Contrast cells (runtime WCAG computation) ──────────────────────

function initContrastCells(): void {
  const cells = document.querySelectorAll<HTMLElement>(
    '.color-contrast-cell:not([data-initialized])',
  )
  for (const cell of cells) {
    const fg = cell.dataset.fg
    const bg = cell.dataset.bg
    if (!fg || !bg) continue

    const fgRgb = parseColorToRGB(fg)
    const bgRgb = parseColorToRGB(bg)
    if (!fgRgb || !bgRgb) continue

    const ratio = contrastRatio(fgRgb, bgRgb)
    cell.innerHTML =
      `<span class="cpt-contrast-ratio">${ratio.toFixed(2)}:1</span> ` + wcagBadge(ratio)
    cell.setAttribute('data-initialized', '')
  }
}

// ── CSS variable resolution in code blocks ─────────────────────────

function initCssVarSwatches(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-var]:not([data-var-resolved])')
  for (const el of elements) {
    const varName = el.dataset.var
    if (!varName) continue

    // Resolve CSS variable value
    const probe = document.createElement('div')
    probe.style.display = 'none'
    probe.style.color = `var(${varName})`
    document.body.appendChild(probe)
    const computed = getComputedStyle(probe).color
    document.body.removeChild(probe)

    el.setAttribute('data-var-resolved', '')

    // Check if it resolved to a real color (not default black from unset var)
    // We test by also checking an invalid var — if both produce the same result, var is unset
    const probe2 = document.createElement('div')
    probe2.style.display = 'none'
    probe2.style.color = 'var(--cpt-nonexistent-test-var)'
    document.body.appendChild(probe2)
    const fallback = getComputedStyle(probe2).color
    document.body.removeChild(probe2)

    if (computed === fallback) continue // variable not defined

    const rgb = parseColorToRGB(computed)
    if (!rgb) continue

    const hex = rgbToHex(rgb)
    const swatch: HTMLSpanElement = document.createElement('span')
    swatch.className = 'color-swatch code-swatch'
    swatch.style.setProperty('--swatch', hex)
    swatch.dataset.color = hex
    el.insertBefore(swatch, el.firstChild)
  }
}

// ── Setup ──────────────────────────────────────────────────────────

/**
 * Initialize client-side color preview interactivity.
 * Call this once in your VitePress theme setup.
 *
 * Features:
 * - Hover tooltip with color format conversions and WCAG contrast info
 * - Click to copy color value to clipboard
 * - Click to copy token table cell text
 * - Runtime WCAG contrast computation for :::colors-contrast tables
 * - Runtime CSS variable resolution for var(--*) in code blocks
 */
export function setupColorPreview(): void {
  if (typeof window === 'undefined') return
  if (document.querySelector('.color-preview-tooltip')) return

  const tooltip = document.createElement('div')
  tooltip.className = 'color-preview-tooltip'
  tooltip.setAttribute('role', 'tooltip')
  document.body.appendChild(tooltip)

  let activeTarget: Element | null = null
  let pinned = false

  function showTooltip(swatch: Element): void {
    const raw = (swatch as HTMLElement).dataset.color
    if (!raw) return

    const rgb = parseColorToRGB(raw)
    if (!rgb) return

    const hex = rgbToHex(rgb)
    const hsl = rgbToHsl(rgb)
    const vsWhite = contrastRatio(rgb, { r: 255, g: 255, b: 255 })
    const vsBlack = contrastRatio(rgb, { r: 0, g: 0, b: 0 })

    tooltip.innerHTML =
      `<div class="cpt-preview" style="--swatch: ${raw}"></div>` +
      `<div class="cpt-formats">` +
      `<code>${hex}</code>` +
      `<code>${formatRgb(rgb)}</code>` +
      `<code>${formatHsl(hsl)}</code>` +
      `</div>` +
      `<div class="cpt-contrast">` +
      `<span>vs white ${vsWhite.toFixed(1)}:1 ${wcagBadge(vsWhite)}</span>` +
      `<span>vs black ${vsBlack.toFixed(1)}:1 ${wcagBadge(vsBlack)}</span>` +
      `</div>`

    tooltip.classList.add('visible')
    requestAnimationFrame(() => positionTooltip(tooltip, swatch))
  }

  function hideTooltip(): void {
    activeTarget = null
    pinned = false
    tooltip.classList.remove('visible')
  }

  // Hover — show tooltip
  document.addEventListener('mouseover', (e) => {
    if (pinned) return
    const target = e.target as Element
    const swatch = target.closest('[data-color]')
    if (!swatch || swatch === activeTarget) return

    activeTarget = swatch
    showTooltip(swatch)
  })

  document.addEventListener('mouseout', (e) => {
    if (pinned) return
    const target = e.target as Element
    const swatch = target.closest('[data-color]')
    if (!swatch) return

    const related = (e as MouseEvent).relatedTarget as Element | null
    if (related && swatch.contains(related)) return

    hideTooltip()
  })

  // Click — toggle pinned tooltip + copy to clipboard
  document.addEventListener('click', (e) => {
    const target = e.target as Element

    // Check for data-copy cell click (but not inside a data-color swatch)
    const copyCell = target.closest('[data-copy]')
    if (copyCell && !target.closest('[data-color]')) {
      const value = (copyCell as HTMLElement).dataset.copy
      if (value) {
        navigator.clipboard.writeText(value).then(() => {
          copyCell.classList.add('copied')
          setTimeout(() => copyCell.classList.remove('copied'), 1200)
        })
      }
      return
    }

    const swatch = target.closest('[data-color]')

    // Click outside swatch — dismiss pinned tooltip
    if (!swatch) {
      if (pinned) hideTooltip()
      return
    }

    const raw = (swatch as HTMLElement).dataset.color
    if (!raw) return

    // If clicking the same swatch that's pinned, unpin it
    if (pinned && swatch === activeTarget) {
      hideTooltip()
    } else {
      // Pin tooltip on this swatch
      activeTarget = swatch
      pinned = true
      showTooltip(swatch)
    }

    // Copy to clipboard
    const code = swatch.closest('code.color-preview')
    const copyValue = code ? (code.textContent?.replace(/^\s+/, '') ?? raw) : raw

    navigator.clipboard.writeText(copyValue).then(() => {
      swatch.classList.add('copied')
      setTimeout(() => swatch.classList.remove('copied'), 1200)
    })
  })

  // Initialize runtime features
  initContrastCells()
  initCssVarSwatches()

  // MutationObserver for SPA navigation — re-init on DOM changes
  const docEl = document.querySelector('.vp-doc') ?? document.body
  const observer = new MutationObserver(() => {
    initContrastCells()
    initCssVarSwatches()
  })
  observer.observe(docEl, { childList: true, subtree: true })
}
