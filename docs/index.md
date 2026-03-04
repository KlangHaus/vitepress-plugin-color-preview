---
layout: home
hero:
  name: Color Preview Plugin
  text: for VitePress
  tagline: Automatic color swatches for your documentation
  actions:
    - text: Get Started
      link: /getting-started
    - text: View on GitHub
      link: https://github.com/KlangHaus/vitepress-plugin-color-preview
      theme: alt
    - text: npm
      link: https://www.npmjs.com/package/vitepress-plugin-color-preview
      theme: alt
---

Inline colors: `#3b82f6` `rgb(239, 68, 68)` `hsl(142, 71%, 45%)` `rebeccapurple`

Tailwind classes: `bg-blue-500` `text-emerald-600` `border-rose-400`

:::colors
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6 #ec4899
:::

:::colors-strip
#1e3a8a #1e40af #1d4ed8 #2563eb #3b82f6 #60a5fa #93c5fd #bfdbfe #dbeafe #eff6ff
:::

:::colors-contrast
| Foreground | Background | Usage |
| ---------- | ---------- | ---------------- |
| #ffffff | #2563eb | White on primary |
| #1e293b | #ffffff | Body text |
| #64748b | #f1f5f9 | Muted text |
:::

## Features

- **Inline code swatches** — write any color in backticks and get a preview. [Learn more →](/inline)
- **Code block swatches** — colors inside fenced code blocks get inline swatches, including `var()` references. [Learn more →](/code-blocks)
- **Color palettes** — `:::colors` container for visual palette display. [Learn more →](/palette)
- **Color strips** — `:::colors-strip` renders a continuous horizontal color bar. [Learn more →](/strip)
- **Token table** — document tokens with color, name, CSS variable, and purpose in a table. Click any cell to copy. [Learn more →](/tokens)
- **Token comparison** — `:::colors-compare` shows token variants (states, scales, themes) side by side with auto-detected swatches. [Learn more →](/compare)
- **Contrast checker** — `:::colors-contrast` computes WCAG contrast ratios between foreground and background colors. [Learn more →](/contrast)
- **Tailwind classes** — detects Tailwind v3 color utilities automatically. [Learn more →](/tailwind)
- **Click to copy** — click any swatch to copy the color value, or click any table cell to copy its text
- **Hover tooltips** — WCAG contrast ratios + HEX/RGB/HSL conversions
- **Dark mode** — adapts to VitePress light/dark theme
