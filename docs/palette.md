# Color Palettes

Display visual color palettes using the `:::colors` container.

## Usage

Wrap color values in a `:::colors` block to render them as large clickable swatches with labels:

```md
:::colors
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6
:::
```

**Result:**

:::colors
#ef4444 #f97316 #eab308 #22c55e #3b82f6 #8b5cf6
:::

Put multiple colors on the same line or use separate lines to group them. Each color shows the value as a label below the swatch. Click any swatch to copy the value.

```md
:::colors
#1e293b #334155 #475569
#64748b #94a3b8 #cbd5e1
:::
```

::: info Requirement
This feature requires `colorPreviewPlugin` in your VitePress config. See [Getting Started](/getting-started) for setup.
:::

## Examples

### Brand Colors

:::colors
#1e293b #334155 #475569 #64748b #94a3b8 #cbd5e1 #e2e8f0 #f1f5f9
:::

### Rainbow

:::colors
#ef4444 #f97316 #eab308 #22c55e #06b6d4 #3b82f6 #8b5cf6 #ec4899
:::

### Blues

:::colors
#eff6ff #dbeafe #bfdbfe #93c5fd #60a5fa #3b82f6 #2563eb #1d4ed8 #1e40af #1e3a8a
:::

### Warm Tones

:::colors
#fef2f2 #fee2e2 #fecaca #fca5a5 #f87171 #ef4444 #dc2626 #b91c1c
:::

### Greens

:::colors
#f0fdf4 #dcfce7 #bbf7d0 #86efac #4ade80 #22c55e #16a34a #15803d
:::

### Grayscale

:::colors
#000000 #171717 #262626 #404040 #525252 #737373 #a3a3a3 #d4d4d4 #e5e5e5 #f5f5f5 #ffffff
:::

### With Transparency

:::colors
#ff000080 #00ff0080 #0000ff80 #ff660040 #8b5cf6cc
:::
