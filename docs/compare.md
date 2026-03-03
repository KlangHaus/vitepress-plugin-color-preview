# Token Comparison

Compare color token variants side by side using `:::colors-compare`.

## Usage

Use a markdown table where any column containing color values will automatically render swatches. Non-color columns render as plain text (click to copy).

```md
:::colors-compare
| Token | Default | Hover | Active |
| ----- | ------- | ----- | ------ |
| primary | #2563eb | #1d4ed8 | #1e40af |
| danger | #dc2626 | #b91c1c | #991b1b |
| success | #16a34a | #15803d | #166534 |
:::
```

**Result:**

:::colors-compare
| Token | Default | Hover | Active |
| ----- | ------- | ----- | ------ |
| primary | #2563eb | #1d4ed8 | #1e40af |
| danger | #dc2626 | #b91c1c | #991b1b |
| success | #16a34a | #15803d | #166534 |
:::

Color columns are auto-detected from the first data row — any column whose value is a valid color gets a swatch. You can have as many color columns as you need.

::: info Requirement
This feature requires `colorPreviewPlugin` in your VitePress config. See [Getting Started](/getting-started) for setup.
:::

## Examples

### Button States

:::colors-compare
| Token | Default | Hover | Active | Disabled |
| ------- | ------- | ------- | ------- | ------- |
| primary | #2563eb | #1d4ed8 | #1e40af | #93c5fd |
| danger | #dc2626 | #b91c1c | #991b1b | #fca5a5 |
| success | #16a34a | #15803d | #166534 | #86efac |
:::

### Brand Scale

:::colors-compare
| Name | 100 | 300 | 500 | 700 | 900 |
| ------ | ------- | ------- | ------- | ------- | ------- |
| blue | #dbeafe | #93c5fd | #3b82f6 | #1d4ed8 | #1e3a8a |
| red | #fee2e2 | #fca5a5 | #ef4444 | #b91c1c | #7f1d1d |
| green | #dcfce7 | #86efac | #22c55e | #15803d | #14532d |
:::

### Surface Layers

:::colors-compare
| Layer | Color | Usage |
| --------- | ------- | -------------------- |
| base | #ffffff | Page background |
| raised | #f5f5f5 | Cards, panels |
| overlay | #e5e5e5 | Modals, dropdowns |
| highlight | #d4d4d4 | Hover states |
:::

### With Tailwind Classes

:::colors-compare
| Component | Background | Text | Border |
| --------- | ---------- | -------------- | ------------ |
| card | bg-white | text-gray-900 | border-gray-200 |
| alert | bg-red-50 | text-red-800 | border-red-200 |
| badge | bg-blue-100 | text-blue-800 | border-blue-200 |
:::
