# Color Strips

Display colors as a continuous horizontal bar using `:::colors-strip`.

## Usage

```md
:::colors-strip
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6
:::
```

**Result:**

:::colors-strip
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6
:::

Each segment shows the color value below and supports hover tooltips and click-to-copy, just like palette swatches.

::: info Requirement
This feature requires `colorPreviewPlugin` in your VitePress config. See [Getting Started](/getting-started) for setup.
:::

## Examples

### Brand Gradient

:::colors-strip
#003a7a #0059b3 #3381cc #66a3d9 #99c4e6
:::

### Warm to Cool

:::colors-strip
#ef4444 #f97316 #eab308 #22c55e #06b6d4 #3b82f6 #8b5cf6
:::

### Grayscale Ramp

:::colors-strip
#000000 #171717 #404040 #737373 #a3a3a3 #d4d4d4 #f5f5f5 #ffffff
:::

### Blues

:::colors-strip
#eff6ff #dbeafe #bfdbfe #93c5fd #60a5fa #3b82f6 #2563eb #1d4ed8 #1e40af #1e3a8a
:::

### With Transparency

:::colors-strip
#ff000080 #ff660040 #ffff0080 #00ff0080 #0000ff80 #8b5cf6cc
:::
