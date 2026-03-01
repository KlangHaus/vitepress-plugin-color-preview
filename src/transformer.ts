import { findColorsInText } from './colors'
import { extractTailwindColor } from './tailwind'

interface HastText {
  type: 'text'
  value: string
}

interface HastElement {
  type: 'element'
  tagName: string
  properties: Record<string, unknown>
  children: (HastElement | HastText)[]
}

/**
 * Shiki transformer that adds color swatches to color values
 * inside fenced code blocks.
 *
 * Usage in VitePress config:
 * ```ts
 * markdown: {
 *   codeTransformers: [colorPreviewTransformer()]
 * }
 * ```
 */
export function colorPreviewTransformer(): {
  name: string
  span: (node: HastElement) => void
} {
  return {
    name: 'color-preview',
    span(node: HastElement) {
      const textChildren = node.children.filter(
        (c): c is HastText => c.type === 'text',
      )
      if (textChildren.length === 0) return

      const fullText = textChildren.map((c) => c.value).join('')

      // Check for CSS color values
      const colors = findColorsInText(fullText)
      if (colors.length > 0) {
        injectSwatch(node, colors[0].value)
        return
      }

      // Check for Tailwind classes — match individual tokens
      const tokens = fullText.split(/\s+/).filter(Boolean)
      for (const token of tokens) {
        const twColor = extractTailwindColor(token)
        if (twColor) {
          injectSwatch(node, twColor)
          return
        }
      }
    },
  }
}

function injectSwatch(node: HastElement, color: string): void {
  const swatch: HastElement = {
    type: 'element',
    tagName: 'span',
    properties: {
      class: 'color-swatch code-swatch',
      style: `--swatch: ${color}`,
      'data-color': color,
    },
    children: [],
  }
  node.children.unshift(swatch)
}
