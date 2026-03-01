# API Reference

## Server-side exports

Imported from `vitepress-plugin-color-preview`.

### `colorPreviewPlugin`

A markdown-it plugin that adds color swatches to inline code and enables `:::colors` palette blocks.

```ts
import { colorPreviewPlugin } from 'vitepress-plugin-color-preview'

// In VitePress config:
markdown: {
  config(md) {
    md.use(colorPreviewPlugin)
  }
}
```

### `colorPreviewTransformer()`

A [Shiki transformer](https://shiki.matsu.io/guide/transformers) that adds color swatches inside fenced code blocks. Returns a transformer object.

```ts
import { colorPreviewTransformer } from 'vitepress-plugin-color-preview'

// In VitePress config:
markdown: {
  codeTransformers: [colorPreviewTransformer()]
}
```

### `extractColor(text)`

Checks if a string is an exact color value. Returns the color string or `null`.

```ts
import { extractColor } from 'vitepress-plugin-color-preview'

extractColor('#ff6600') // '#ff6600'
extractColor('rebeccapurple') // 'rebeccapurple'
extractColor('rgb(255, 0, 0)') // 'rgb(255, 0, 0)'
extractColor('not a color') // null
extractColor('hello') // null
```

### `findColorsInText(text)`

Finds all color values within a string. Returns an array of matches with position info.

```ts
import { findColorsInText } from 'vitepress-plugin-color-preview'

findColorsInText('color: #ff6600; background: rgb(0, 128, 255);')
// [
//   { value: '#ff6600', index: 7, length: 7 },
//   { value: 'rgb(0, 128, 255)', index: 27, length: 16 }
// ]
```

### `isNamedColor(text)`

Checks if a string is a valid CSS named color.

```ts
import { isNamedColor } from 'vitepress-plugin-color-preview'

isNamedColor('coral') // true
isNamedColor('rebeccapurple') // true
isNamedColor('banana') // false
```

### `extractTailwindColor(className)`

Resolves a Tailwind CSS utility class to its hex color. Returns the hex string or `null`. Supports all default Tailwind v3 colors.

```ts
import { extractTailwindColor } from 'vitepress-plugin-color-preview'

extractTailwindColor('bg-blue-500') // '#3b82f6'
extractTailwindColor('text-red-600') // '#dc2626'
extractTailwindColor('border-black') // '#000000'
extractTailwindColor('p-4') // null
extractTailwindColor('bg-custom-500') // null
```

## Client-side exports

Imported from `vitepress-plugin-color-preview/client`.

### `setupColorPreview()`

Initializes interactive features using event delegation on `document`. Call once after the DOM is ready.

```ts
import { setupColorPreview } from 'vitepress-plugin-color-preview/client'

// In VitePress theme:
onMounted(() => setupColorPreview())
```

**Features enabled:**

| Feature       | Trigger               | Description                                              |
| ------------- | --------------------- | -------------------------------------------------------- |
| Hover tooltip | Mouse over any swatch | Shows HEX, RGB, HSL conversions and WCAG contrast ratios |
| Click to copy | Click any swatch      | Copies the color value to clipboard with visual feedback |
| WCAG badges   | Included in tooltip   | AA/AAA compliance badges against white and black         |

## CSS

Imported from `vitepress-plugin-color-preview/style.css`.

```ts
import 'vitepress-plugin-color-preview/style.css'
```

This import is **required** for swatches to render correctly. It includes styles for:

- Inline code swatches (checkered background for transparency)
- Fenced code block swatches
- `:::colors` palette layout
- Hover tooltips
- Click-to-copy feedback animation
- Dark mode support (via VitePress `.dark` class)
