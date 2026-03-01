import type MarkdownIt from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import { extractColor } from './colors'
import { extractTailwindColor } from './tailwind'

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
