# vitepress-plugin-color-preview

[![npm version](https://img.shields.io/npm/v/vitepress-plugin-color-preview)](https://www.npmjs.com/package/vitepress-plugin-color-preview)
[![npm downloads](https://img.shields.io/npm/dm/vitepress-plugin-color-preview)](https://www.npmjs.com/package/vitepress-plugin-color-preview)
[![CI](https://github.com/KlangHaus/vitepress-plugin-color-preview/actions/workflows/ci.yml/badge.svg)](https://github.com/KlangHaus/vitepress-plugin-color-preview/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/vitepress-plugin-color-preview)](LICENSE)

Automatic color swatches for your VitePress documentation. Detects CSS color values and Tailwind classes in your markdown and renders inline previews.

[Live Demo](https://klanghaus.github.io/vitepress-plugin-color-preview/) | [npm](https://www.npmjs.com/package/vitepress-plugin-color-preview) | [GitHub](https://github.com/KlangHaus/vitepress-plugin-color-preview)

![Inline swatches and color palettes](images/front.png)

## Features

- **Inline code swatches** — `#3b82f6`, `rgb(239, 68, 68)`, `hsl(142, 71%, 45%)`, `rebeccapurple`
- **Fenced code blocks** — swatches inside CSS, SCSS, JS, TS code blocks
- **CSS variable resolution** — `var(--vp-c-brand)` gets a swatch at runtime if the variable is defined
- **Color palettes** — `:::colors` container for visual palette display
- **Color strips** — `:::colors-strip` renders a continuous horizontal color bar
- **Token table** — `:::colors` with table syntax for structured token documentation
- **Token comparison** — `:::colors-compare` shows variants (states, scales) side by side
- **Contrast checker** — `:::colors-contrast` computes WCAG contrast ratios with AA/AAA badges
- **Tailwind classes** — `bg-blue-500`, `text-emerald-600`, `border-rose-400`
- **Click to copy** — click any swatch or table cell to copy the value
- **WCAG contrast** — hover tooltip shows contrast ratio against white/black
- **Format conversion** — hover tooltip shows HEX, RGB, and HSL
- **Dark mode** — adapts to VitePress light/dark theme

### Supported color formats

| Format     | Examples                                           |
| ---------- | -------------------------------------------------- |
| Hex        | `#f00` `#ff6600` `#ff660080`                       |
| RGB/RGBA   | `rgb(255, 100, 0)` `rgba(255, 100, 0, 0.5)`        |
| Modern RGB | `rgb(255 100 0 / 50%)`                             |
| HSL/HSLA   | `hsl(30, 100%, 50%)` `hsla(30, 100%, 50%, 0.5)`    |
| Modern HSL | `hsl(30 100% 50% / 50%)`                           |
| OKLCH      | `oklch(70% 0.15 30)`                               |
| OKLAB      | `oklab(70% 0.1 -0.05)`                             |
| Named      | `red` `cornflowerblue` `rebeccapurple`             |
| Tailwind   | `bg-blue-500` `text-emerald-600` `border-rose-400` |

## Install

```bash
npm install vitepress-plugin-color-preview
```

## Setup

### 1. VitePress config

```ts
// .vitepress/config.ts
import { colorPreviewPlugin, colorPreviewTransformer } from 'vitepress-plugin-color-preview'

export default {
  markdown: {
    config(md) {
      md.use(colorPreviewPlugin)
    },
    codeTransformers: [colorPreviewTransformer()],
  },
}
```

`colorPreviewPlugin` handles inline code, `:::colors` palettes, `:::colors-strip`, `:::colors-compare`, and `:::colors-contrast`. `colorPreviewTransformer` handles fenced code blocks and `var()` markers. Both are optional — use only what you need.

### 2. Theme setup

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { setupColorPreview } from 'vitepress-plugin-color-preview/client'
import 'vitepress-plugin-color-preview/style.css'
import { onMounted } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => setupColorPreview())
  },
}
```

![Hover tooltip with format conversion and WCAG contrast](images/tooltip.png)

The client setup enables interactive features: hover tooltips, click-to-copy, WCAG contrast cells, and CSS variable resolution. The CSS import is required for swatch styling. If you only want static swatches without interactivity, you can skip `setupColorPreview()` and just import the CSS.

## Usage

### Inline code

Write color values in backticks and they automatically get a swatch:

```md
The primary color is `#3b82f6` and the accent is `hsl(280, 67%, 60%)`.
```

### Tailwind classes

![Tailwind class support with tooltip](images/tailwind.png)

Tailwind utility classes are detected automatically:

```md
Use `bg-blue-500` for the button and `text-gray-900` for the label.
```

### Fenced code blocks

Colors in code blocks get small inline swatches. CSS `var()` references are resolved at runtime:

````md
```css
:root {
  --primary: #3b82f6;
  --danger: #ef4444;
}
.button {
  color: var(--vp-c-brand-1);
}
```
````

### Color palettes

```md
:::colors
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6 #ec4899
:::
```

### Color strips

```md
:::colors-strip
#1e3a8a #1e40af #1d4ed8 #2563eb #3b82f6 #60a5fa #93c5fd #bfdbfe
:::
```

### Token table

```md
:::colors
| Color | Token | CSS Variable | Purpose |
| ------- | ------- | --------------- | ------------------- |
| #0059b3 | primary | --color-primary | Primary brand color |
| #22c55e | success | --color-success | Success feedback |
:::
```

### Token comparison

```md
:::colors-compare
| Token | Default | Hover | Active |
| ------- | ------- | ------- | ------- |
| primary | #2563eb | #1d4ed8 | #1e40af |
| danger | #dc2626 | #b91c1c | #991b1b |
:::
```

### Contrast checker

```md
:::colors-contrast
| Foreground | Background | Usage |
| ---------- | ---------- | ---------------- |
| #ffffff | #2563eb | White on primary |
| #1e293b | #ffffff | Body text |
:::
```

## API

### Server-side (markdown-it)

```ts
import { colorPreviewPlugin, colorPreviewTransformer } from 'vitepress-plugin-color-preview'

// markdown-it plugin — inline code + :::colors variants
md.use(colorPreviewPlugin)

// Shiki transformer — fenced code blocks + var() markers
const transformer = colorPreviewTransformer()
```

### Client-side (browser)

```ts
import { setupColorPreview } from 'vitepress-plugin-color-preview/client'

// Enables tooltips, click-to-copy, contrast cells, CSS var resolution
setupColorPreview()
```

### Utilities

```ts
import {
  extractColor,
  findColorsInText,
  isNamedColor,
  extractTailwindColor,
} from 'vitepress-plugin-color-preview'

extractColor('#ff6600') // '#ff6600'
extractColor('rebeccapurple') // 'rebeccapurple'
extractColor('not a color') // null

findColorsInText('color: #ff6600;') // [{ value: '#ff6600', index: 7, length: 7 }]

isNamedColor('coral') // true

extractTailwindColor('bg-blue-500') // '#3b82f6'
extractTailwindColor('p-4') // null
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/allanasp"><img src="https://github.com/allanasp.png" width="80px;" alt=""/><br /><sub><b>Allan Asp</b></sub></a></td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT
