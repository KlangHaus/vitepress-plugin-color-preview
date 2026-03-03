# Getting Started

## Installation

Install the plugin via npm:

```bash
npm install vitepress-plugin-color-preview
```

Or with your preferred package manager:

```bash
pnpm add vitepress-plugin-color-preview
yarn add vitepress-plugin-color-preview
```

## Configuration

The plugin has two parts: a **server-side** markdown plugin and a **client-side** setup for interactivity.

### 1. VitePress config

Add the markdown-it plugin and Shiki transformer to your VitePress config:

```ts
// .vitepress/config.ts
import { colorPreviewPlugin, colorPreviewTransformer } from 'vitepress-plugin-color-preview'

export default {
  markdown: {
    config(md) {
      md.use(colorPreviewPlugin) // [!code highlight]
    },
    codeTransformers: [colorPreviewTransformer()], // [!code highlight]
  },
}
```

| Export                    | What it does                                                |
| ------------------------- | ----------------------------------------------------------- |
| `colorPreviewPlugin`      | Adds swatches to inline code and `:::colors` palette blocks |
| `colorPreviewTransformer` | Adds swatches inside fenced code blocks                     |

Both are optional — use only what you need. If you only want inline swatches, skip `colorPreviewTransformer`. If you only want code block swatches, skip `colorPreviewPlugin`.

### 2. Theme setup

Import the CSS and set up the client-side interactivity in your theme:

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { setupColorPreview } from 'vitepress-plugin-color-preview/client' // [!code highlight]
import 'vitepress-plugin-color-preview/style.css' // [!code highlight]
import { onMounted } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => setupColorPreview()) // [!code highlight]
  },
}
```

| Import                | What it does                                                                           |
| --------------------- | -------------------------------------------------------------------------------------- |
| `style.css`           | Required — styles for swatches, tooltips, palettes, strips, and tables                 |
| `setupColorPreview()` | Optional — enables hover tooltips, click-to-copy, contrast cells, and CSS var swatches |

If you only want static swatches without interactivity, you can skip `setupColorPreview()` and just import the CSS. Note that `:::colors-contrast` WCAG badges and `var()` code block swatches require `setupColorPreview()` since they are computed at runtime.

## Minimal setup

If you want everything enabled with minimal code:

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

That's it. Write any color value in backticks and it gets a swatch: `#3b82f6`
