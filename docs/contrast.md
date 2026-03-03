# Contrast Checker

Check WCAG contrast ratios between foreground and background colors using `:::colors-contrast`.

## Usage

The first two columns are foreground and background colors. A contrast ratio and WCAG compliance badge are computed automatically at runtime.

```md
:::colors-contrast
| Foreground | Background | Usage |
| ---------- | ---------- | ----- |
| #ffffff | #0059b3 | White on primary |
| #1e293b | #ffffff | Body text |
| #64748b | #ffffff | Muted text |
:::
```

**Result:**

:::colors-contrast
| Foreground | Background | Usage |
| ---------- | ---------- | ----- |
| #ffffff | #0059b3 | White on primary |
| #1e293b | #ffffff | Body text |
| #64748b | #ffffff | Muted text |
:::

Badges indicate WCAG 2.1 compliance:

- **AAA** — ratio ≥ 7:1 (enhanced contrast)
- **AA** — ratio ≥ 4.5:1 (normal text)
- **AA18** — ratio ≥ 3:1 (large text only)
- **Fail** — ratio < 3:1

See [Understanding Contrast](/understanding-contrast) for a full explanation of what these levels mean and how to choose accessible color combinations.

::: info Requirement
This feature requires both `colorPreviewPlugin` and `setupColorPreview()` (client-side). See [Getting Started](/getting-started) for setup.
:::

## Examples

### Brand Text Combinations

:::colors-contrast
| Foreground | Background | Context |
| ---------- | ---------- | ---------------------- |
| #ffffff | #0059b3 | White on primary |
| #ffffff | #16a34a | White on success |
| #ffffff | #dc2626 | White on error |
| #1e293b | #ffffff | Dark text on white |
| #1e293b | #f1f5f9 | Dark text on light gray |
| #64748b | #ffffff | Muted text on white |
:::

### Dark Mode Pairs

:::colors-contrast
| Foreground | Background | Context |
| ---------- | ---------- | -------------------- |
| #f8fafc | #0f172a | Light text on dark bg |
| #4da6ff | #0f172a | Link on dark bg |
| #94a3b8 | #0f172a | Muted on dark bg |
| #fbbf24 | #0f172a | Warning on dark bg |
:::

### Button States

:::colors-contrast
| Foreground | Background | State |
| ---------- | ---------- | ------- |
| #ffffff | #2563eb | Default |
| #ffffff | #1d4ed8 | Hover |
| #ffffff | #1e40af | Active |
| #94a3b8 | #e2e8f0 | Disabled |
:::
