# Tailwind Class Support

Tailwind CSS utility classes are automatically detected and resolved to their color values.

## Usage

Write any Tailwind color utility class in backticks:

```md
Use `bg-blue-500` for the button and `text-gray-900` for the label.
```

**Result:** Use `bg-blue-500` for the button and `text-gray-900` for the label.

The plugin recognizes all default Tailwind v3 color utilities including `bg-`, `text-`, `border-`, `ring-`, `fill-`, `stroke-`, `from-`, `via-`, `to-`, `shadow-`, `accent-`, `divide-`, `outline-`, and `decoration-`.

Hover over a swatch to see the resolved hex value, RGB, and HSL conversions.

::: tip
Only default Tailwind v3 colors are supported. Custom colors defined in your `tailwind.config.js` are not detected.
:::

::: info Requirement
This feature requires `colorPreviewPlugin` in your VitePress config. See [Getting Started](/getting-started) for setup.
:::

## Supported utilities

### Background Colors

`bg-blue-500` `bg-red-600` `bg-green-400` `bg-purple-700` `bg-amber-300`

### Text Colors

`text-slate-900` `text-gray-500` `text-emerald-600` `text-rose-500` `text-indigo-400`

### Border Colors

`border-blue-300` `border-red-200` `border-green-500` `border-purple-400`

### Other Utilities

`ring-blue-500` `shadow-red-500` `accent-pink-600`
`fill-emerald-500` `stroke-blue-700`
`from-purple-500` `via-pink-500` `to-red-500`
`divide-gray-200` `outline-blue-600` `decoration-rose-500`

### Simple Colors

`bg-black` `bg-white` `text-black` `text-white`

### All Shades of Blue

`bg-blue-50` `bg-blue-100` `bg-blue-200` `bg-blue-300` `bg-blue-400`
`bg-blue-500` `bg-blue-600` `bg-blue-700` `bg-blue-800` `bg-blue-900` `bg-blue-950`

### No Match

These should NOT get swatches:

`bg-custom-500` `text-primary` `border-brand` `p-4` `flex` `grid`
