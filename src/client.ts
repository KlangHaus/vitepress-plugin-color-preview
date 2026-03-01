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
  const cls = level === 'Fail' ? 'fail' : level === 'AAA' ? 'aaa' : 'aa'
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

// ── Setup ──────────────────────────────────────────────────────────

/**
 * Initialize client-side color preview interactivity.
 * Call this once in your VitePress theme setup.
 *
 * Features:
 * - Hover tooltip with color format conversions and WCAG contrast info
 * - Click to copy color value to clipboard
 */
export function setupColorPreview(): void {
  if (typeof window === 'undefined') return
  if (document.querySelector('.color-preview-tooltip')) return

  const tooltip = document.createElement('div')
  tooltip.className = 'color-preview-tooltip'
  tooltip.setAttribute('role', 'tooltip')
  document.body.appendChild(tooltip)

  let activeTarget: Element | null = null

  // Hover — show tooltip
  document.addEventListener('mouseover', (e) => {
    const target = e.target as Element
    const swatch = target.closest('.color-swatch') || target.closest('.palette-swatch')
    if (!swatch || swatch === activeTarget) return

    activeTarget = swatch

    const raw =
      (swatch as HTMLElement).dataset.color ||
      getComputedStyle(swatch).getPropertyValue('--swatch').trim()
    if (!raw) return

    const rgb = parseColorToRGB(raw)
    if (!rgb) return

    const hex = rgbToHex(rgb)
    const hsl = rgbToHsl(rgb)
    const vsWhite = contrastRatio(rgb, { r: 255, g: 255, b: 255 })
    const vsBlack = contrastRatio(rgb, { r: 0, g: 0, b: 0 })

    tooltip.innerHTML =
      `<div class="cpt-preview" style="background: ${raw}"></div>` +
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
    // Position after making visible so dimensions are computed
    requestAnimationFrame(() => positionTooltip(tooltip, swatch))
  })

  document.addEventListener('mouseout', (e) => {
    const target = e.target as Element
    const swatch = target.closest('.color-swatch') || target.closest('.palette-swatch')
    if (!swatch) return

    // Check that we're actually leaving the swatch (not entering a child)
    const related = (e as MouseEvent).relatedTarget as Element | null
    if (related && swatch.contains(related)) return

    activeTarget = null
    tooltip.classList.remove('visible')
  })

  // Click — copy to clipboard
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    const swatch = target.closest('.color-swatch') || target.closest('.palette-swatch')
    if (!swatch) return

    const raw =
      (swatch as HTMLElement).dataset.color ||
      getComputedStyle(swatch).getPropertyValue('--swatch').trim()
    if (!raw) return

    // For inline code swatches, copy the code text content
    const code = swatch.closest('code.color-preview')
    const copyValue = code ? (code.textContent?.replace(/^\s+/, '') ?? raw) : raw

    navigator.clipboard.writeText(copyValue).then(() => {
      swatch.classList.add('copied')
      setTimeout(() => swatch.classList.remove('copied'), 1200)
    })
  })
}
