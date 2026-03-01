import type MarkdownIt from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import { extractColor } from './colors'
import { extractTailwindColor } from './tailwind'

interface TokenRow {
  color: string
  columns: string[]
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

/** Render :::colors table as a design token table with swatches */
function renderTokenTable(md: MarkdownIt, lines: string[]): string {
  let headerCells: string[] | null = null
  const rows: TokenRow[] = []

  for (const line of lines) {
    const cells = parseTableRow(line)
    if (cells.length === 0) continue
    if (isSeparatorRow(cells)) continue

    // First cell should be a color value — detect if it's a header row
    const firstCell = cells[0]
    const isColor = extractColor(firstCell) !== null || extractTailwindColor(firstCell) !== null
    if (!isColor && !headerCells) {
      // This is a header row
      headerCells = cells.slice(1) // skip the "Color" header
      continue
    }

    rows.push({
      color: firstCell,
      columns: cells.slice(1),
    })
  }

  // Build HTML table
  let html = `<div class="color-token-table"><table>`

  // Header
  html += `<thead><tr><th>Color</th>`
  if (headerCells) {
    for (const h of headerCells) {
      html += `<th>${md.utils.escapeHtml(h)}</th>`
    }
  } else if (rows.length > 0) {
    for (let i = 0; i < rows[0].columns.length; i++) {
      html += `<th></th>`
    }
  }
  html += `</tr></thead>`

  // Body
  html += `<tbody>`
  for (const row of rows) {
    const color = md.utils.escapeHtml(row.color)
    const resolvedColor = extractTailwindColor(row.color) ?? row.color
    const escapedResolved = md.utils.escapeHtml(resolvedColor)

    html += `<tr>`
    html += `<td class="color-token-color">`
    html += `<span class="color-token-swatch" style="--swatch: ${escapedResolved}" data-color="${escapedResolved}"></span>`
    html += `<code>${color}</code>`
    html += `</td>`

    for (const cell of row.columns) {
      html += `<td>${md.utils.escapeHtml(cell)}</td>`
    }
    html += `</tr>`
  }
  html += `</tbody></table></div>`

  return html
}

/**
 * markdown-it plugin that adds color swatch previews to:
 * 1. Inline code blocks containing CSS color values or Tailwind classes
 * 2. :::colors palette containers
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

/** Add :::colors palette container block rule */
function paletteContainerRule(md: MarkdownIt): void {
  md.block.ruler.before(
    'fence',
    'color_palette',
    (state: StateBlock, startLine: number, endLine: number, silent: boolean) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine]
      const startMax = state.eMarks[startLine]
      const lineText = state.src.slice(startPos, startMax).trim()

      if (!lineText.startsWith(':::colors')) return false
      if (silent) return true

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
      token.map = [startLine, nextLine + 1]
      state.line = nextLine + 1

      return true
    },
  )

  md.renderer.rules.color_palette = (tokens, idx) => {
    const content = tokens[idx].content
    const lines = content.split('\n').filter((l) => l.trim())

    // Detect table syntax: lines starting with |
    const isTable = lines.every((l) => l.trim().startsWith('|'))

    if (isTable) {
      return renderTokenTable(md, lines)
    }

    // Simple palette: just color values
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
}
