import type MarkdownIt from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import { extractColor } from './colors'
import { extractTailwindColor } from './tailwind'

type PaletteVariant = 'colors' | 'colors-compare' | 'colors-contrast' | 'colors-strip'

const VARIANT_RE = /^:::(colors(?:-compare|-contrast|-strip)?)\s*$/

interface ParsedTable {
  headerCells: string[] | null
  dataRows: string[][]
}

/** Parse a | col1 | col2 | ... | line into trimmed cells */
function parseTableRow(line: string): string[] {
  return line
    .split('|')
    .slice(1, -1) // drop empty first/last from leading/trailing |
    .map((cell) => cell.trim())
}

/** Detect if a row is a markdown table separator (e.g. | --- | --- |) */
function isSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^:?-+:?$/.test(cell))
}

/** Parse all table rows into header + data rows. Reused by all table renderers. */
function parseAllRows(lines: string[]): ParsedTable {
  let headerCells: string[] | null = null
  const dataRows: string[][] = []
  let foundSeparator = false

  for (const line of lines) {
    const cells = parseTableRow(line)
    if (cells.length === 0) continue
    if (isSeparatorRow(cells)) {
      foundSeparator = true
      continue
    }

    // First non-separator row before a separator is the header
    if (!foundSeparator && !headerCells && dataRows.length === 0) {
      // Check if first cell is a color — if so, there's no header row
      const firstCell = cells[0]
      const isColor = extractColor(firstCell) !== null || extractTailwindColor(firstCell) !== null
      if (!isColor) {
        headerCells = cells
        continue
      }
    }

    dataRows.push(cells)
  }

  return { headerCells, dataRows }
}

/** Test if a cell value resolves to a color */
function isColorCell(value: string): boolean {
  return extractColor(value) !== null || extractTailwindColor(value) !== null
}

/** Render a swatch + code for a color cell */
function renderColorCell(md: MarkdownIt, raw: string): string {
  const escaped = md.utils.escapeHtml(raw)
  const resolvedColor = extractTailwindColor(raw) ?? raw
  const escapedResolved = md.utils.escapeHtml(resolvedColor)
  return (
    `<td><div class="color-token-color">` +
    `<span class="color-token-swatch" style="--swatch: ${escapedResolved}" data-color="${escapedResolved}"></span>` +
    `<code>${escaped}</code>` +
    `</div></td>`
  )
}

/** Render :::colors table as a design token table with swatches */
function renderTokenTable(md: MarkdownIt, lines: string[]): string {
  const { headerCells, dataRows } = parseAllRows(lines)

  // In the token table, first column is always color
  let html = `<div class="color-token-table"><table>`

  // Header
  html += `<thead><tr><th>Color</th>`
  if (headerCells) {
    for (const h of headerCells.slice(1)) {
      html += `<th>${md.utils.escapeHtml(h)}</th>`
    }
  } else if (dataRows.length > 0) {
    for (let i = 1; i < dataRows[0].length; i++) {
      html += `<th></th>`
    }
  }
  html += `</tr></thead>`

  // Body
  html += `<tbody>`
  for (const row of dataRows) {
    const color = row[0]
    html += `<tr>`
    html += renderColorCell(md, color)

    for (let i = 1; i < row.length; i++) {
      const cellText = md.utils.escapeHtml(row[i])
      html += `<td data-copy="${cellText}">${cellText}</td>`
    }
    html += `</tr>`
  }
  html += `</tbody></table></div>`

  return html
}

/** Render :::colors-strip as a continuous horizontal color bar */
function renderStrip(md: MarkdownIt, content: string): string {
  const colors = content.split(/\s+/).filter(Boolean)
  if (colors.length === 0) return ''

  let html = `<div class="color-strip">`
  for (const c of colors) {
    const escaped = md.utils.escapeHtml(c)
    const resolved = extractTailwindColor(c) ?? c
    const escapedResolved = md.utils.escapeHtml(resolved)
    html +=
      `<div class="strip-segment">` +
      `<div class="strip-color" style="--swatch: ${escapedResolved}" data-color="${escapedResolved}"></div>` +
      `<span class="strip-label">${escaped}</span>` +
      `</div>`
  }
  html += `</div>`
  return html
}

/** Render :::colors-compare as a table with auto-detected color columns */
function renderCompareTable(md: MarkdownIt, lines: string[]): string {
  const { headerCells, dataRows } = parseAllRows(lines)
  if (dataRows.length === 0) return ''

  // Auto-detect which columns are color columns using first data row
  const colorCols = new Set<number>()
  for (let i = 0; i < dataRows[0].length; i++) {
    if (isColorCell(dataRows[0][i])) {
      colorCols.add(i)
    }
  }

  let html = `<div class="color-token-table color-compare-table"><table>`

  // Header
  if (headerCells) {
    html += `<thead><tr>`
    for (const h of headerCells) {
      html += `<th>${md.utils.escapeHtml(h)}</th>`
    }
    html += `</tr></thead>`
  }

  // Body
  html += `<tbody>`
  for (const row of dataRows) {
    html += `<tr>`
    for (let i = 0; i < row.length; i++) {
      if (colorCols.has(i)) {
        html += renderColorCell(md, row[i])
      } else {
        const cellText = md.utils.escapeHtml(row[i])
        html += `<td data-copy="${cellText}">${cellText}</td>`
      }
    }
    html += `</tr>`
  }
  html += `</tbody></table></div>`

  return html
}

/** Render :::colors-contrast as a WCAG contrast check table */
function renderContrastTable(md: MarkdownIt, lines: string[]): string {
  const { headerCells, dataRows } = parseAllRows(lines)
  if (dataRows.length === 0) return ''

  // First two columns are fg/bg colors, rest are metadata
  const extraHeaders = headerCells ? headerCells.slice(2) : []

  let html = `<div class="color-token-table color-contrast-table"><table>`

  // Header
  html += `<thead><tr><th>Pair</th><th>Contrast</th>`
  for (const h of extraHeaders) {
    html += `<th>${md.utils.escapeHtml(h)}</th>`
  }
  html += `</tr></thead>`

  // Body
  html += `<tbody>`
  for (const row of dataRows) {
    const fg = row[0] ?? ''
    const bg = row[1] ?? ''
    const fgResolved = extractTailwindColor(fg) ?? fg
    const bgResolved = extractTailwindColor(bg) ?? bg
    const fgEsc = md.utils.escapeHtml(fgResolved)
    const bgEsc = md.utils.escapeHtml(bgResolved)

    html += `<tr>`

    // Pair cell — two swatches side by side
    html += `<td><div class="color-contrast-pair">`
    html += `<span class="color-token-swatch" style="--swatch: ${fgEsc}" data-color="${fgEsc}"></span>`
    html += `<span class="color-token-swatch" style="--swatch: ${bgEsc}" data-color="${bgEsc}"></span>`
    html += `<code>${md.utils.escapeHtml(fg)} / ${md.utils.escapeHtml(bg)}</code>`
    html += `</div></td>`

    // Contrast cell — computed at runtime
    html += `<td class="color-contrast-cell" data-fg="${fgEsc}" data-bg="${bgEsc}"></td>`

    // Remaining metadata columns
    for (let i = 2; i < row.length; i++) {
      const cellText = md.utils.escapeHtml(row[i])
      html += `<td data-copy="${cellText}">${cellText}</td>`
    }

    html += `</tr>`
  }
  html += `</tbody></table></div>`

  return html
}

/** Render simple palette — space-separated colors as large swatches */
function renderSimplePalette(md: MarkdownIt, content: string): string {
  const colors = content.split(/\s+/).filter(Boolean)

  const swatches = colors
    .map((c) => {
      const escaped = md.utils.escapeHtml(c)
      return (
        `<div class="palette-item">` +
        `<div class="palette-swatch" style="--swatch: ${escaped}" data-color="${escaped}"></div>` +
        `<span class="palette-label">${escaped}</span>` +
        `</div>`
      )
    })
    .join('')

  return `<div class="color-palette">${swatches}</div>`
}

/**
 * markdown-it plugin that adds color swatch previews to:
 * 1. Inline code blocks containing CSS color values or Tailwind classes
 * 2. :::colors palette containers (and variants: compare, contrast, strip)
 */
export function colorPreviewPlugin(md: MarkdownIt): void {
  inlineCodeRule(md)
  paletteContainerRule(md)
}

/** Override inline code renderer to inject swatches */
function inlineCodeRule(md: MarkdownIt): void {
  const defaultRenderer = md.renderer.rules.code_inline

  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const content = token.content
    const escaped = md.utils.escapeHtml(content)

    // Check CSS color values first
    const cssColor = extractColor(content)
    if (cssColor) {
      const escapedColor = md.utils.escapeHtml(cssColor)
      return `<code class="color-preview"><span class="color-swatch" style="--swatch: ${escapedColor}" data-color="${escapedColor}"></span>${escaped}</code>`
    }

    // Check Tailwind utility classes
    const twColor = extractTailwindColor(content)
    if (twColor) {
      const escapedColor = md.utils.escapeHtml(twColor)
      return `<code class="color-preview"><span class="color-swatch" style="--swatch: ${escapedColor}" data-color="${escapedColor}"></span>${escaped}</code>`
    }

    // Fall back to default renderer
    if (defaultRenderer) {
      return defaultRenderer(tokens, idx, options, env, self)
    }
    return `<code>${escaped}</code>`
  }
}

/** Add :::colors palette container block rule (with variant dispatch) */
function paletteContainerRule(md: MarkdownIt): void {
  md.block.ruler.before(
    'fence',
    'color_palette',
    (state: StateBlock, startLine: number, endLine: number, silent: boolean) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine]
      const startMax = state.eMarks[startLine]
      const lineText = state.src.slice(startPos, startMax).trim()

      const variantMatch = lineText.match(VARIANT_RE)
      if (!variantMatch) return false
      if (silent) return true

      const variant = variantMatch[1] as PaletteVariant

      // Find closing :::
      let nextLine = startLine + 1
      while (nextLine < endLine) {
        const pos = state.bMarks[nextLine] + state.tShift[nextLine]
        const max = state.eMarks[nextLine]
        const line = state.src.slice(pos, max).trim()
        if (line === ':::') break
        nextLine++
      }

      // Collect content lines
      const contentLines: string[] = []
      for (let i = startLine + 1; i < nextLine; i++) {
        const pos = state.bMarks[i] + state.tShift[i]
        const max = state.eMarks[i]
        contentLines.push(state.src.slice(pos, max))
      }

      const token = state.push('color_palette', 'div', 0)
      token.content = contentLines.join('\n')
      token.meta = { variant }
      token.map = [startLine, nextLine + 1]
      state.line = nextLine + 1

      return true
    },
  )

  md.renderer.rules.color_palette = (tokens, idx) => {
    const token = tokens[idx]
    const content = token.content
    const variant: PaletteVariant = token.meta?.variant ?? 'colors'
    const lines = content.split('\n').filter((l) => l.trim())

    // Detect table syntax: lines starting with |
    const isTable = lines.every((l) => l.trim().startsWith('|'))

    switch (variant) {
      case 'colors-strip':
        return renderStrip(md, content)

      case 'colors-compare':
        if (isTable) return renderCompareTable(md, lines)
        return renderSimplePalette(md, content)

      case 'colors-contrast':
        if (isTable) return renderContrastTable(md, lines)
        return renderSimplePalette(md, content)

      default:
        // Original :::colors behavior
        if (isTable) return renderTokenTable(md, lines)
        return renderSimplePalette(md, content)
    }
  }
}
