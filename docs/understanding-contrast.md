# Understanding Contrast

This page explains the WCAG contrast concepts used by the [Contrast Checker](/contrast) and hover tooltips.

## What is contrast ratio?

Contrast ratio measures the difference in perceived brightness between two colors. It's expressed as a ratio like **4.5:1** — the first number tells you how many times brighter the lighter color is compared to the darker one.

- **1:1** — no contrast (same color)
- **21:1** — maximum contrast (black on white)

The ratio is calculated from the _relative luminance_ of each color using the formula defined in [WCAG 2.1](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio):

> (L1 + 0.05) / (L2 + 0.05)

where L1 is the luminance of the lighter color and L2 is the luminance of the darker color.

## WCAG compliance levels

The [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) define minimum contrast ratios to ensure text is readable for people with low vision or color deficiencies.

### AAA — Enhanced contrast

| Requirement                        | Minimum ratio |
| ---------------------------------- | ------------- |
| Normal text (< 18pt / < 14pt bold) | **7:1**       |
| Large text (≥ 18pt / ≥ 14pt bold)  | **4.5:1**     |

AAA is the highest level of conformance. It ensures readability in the widest range of conditions. Not all content can meet this level, but it's recommended for body text wherever possible.

:::colors-contrast
| Foreground | Background | Note |
| ---------- | ---------- | ---- |
| #000000 | #ffffff | 21:1 — maximum contrast |
| #1e293b | #ffffff | Easily passes AAA |
:::

### AA — Standard contrast

| Requirement                        | Minimum ratio |
| ---------------------------------- | ------------- |
| Normal text (< 18pt / < 14pt bold) | **4.5:1**     |
| Large text (≥ 18pt / ≥ 14pt bold)  | **3:1**       |

AA is the baseline standard for accessibility compliance. Most accessibility regulations (ADA, EN 301 549, etc.) require AA conformance.

:::colors-contrast
| Foreground | Background | Note |
| ---------- | ---------- | ---- |
| #ffffff | #2563eb | Passes AA for normal text |
| #ffffff | #16a34a | Passes AA for normal text |
:::

### AA18 — Large text only

| Requirement                       | Minimum ratio |
| --------------------------------- | ------------- |
| Large text (≥ 18pt / ≥ 14pt bold) | **3:1**       |

When the badge shows **AA18**, the contrast ratio is between 3:1 and 4.5:1. This means the pair is only acceptable for _large text_ — text that is at least 18pt (24px) or 14pt (18.66px) bold.

:::colors-contrast
| Foreground | Background | Note |
| ---------- | ---------- | ---- |
| #ffffff | #f59e0b | Only suitable for large text |
| #64748b | #ffffff | Only suitable for large text |
:::

::: warning
If you see AA18 on a pair used for body text, you should choose a higher-contrast combination.
:::

### Fail — Insufficient contrast

A ratio below **3:1** fails all WCAG criteria. Text with this contrast will be difficult or impossible to read for many users.

:::colors-contrast
| Foreground | Background | Note |
| ---------- | ---------- | ---- |
| #d4d4d4 | #ffffff | Very low contrast |
| #93c5fd | #ffffff | Looks like it works, but doesn't |
:::

## Badge summary

| Badge    | Color  | Ratio   | Meaning                                           |
| -------- | ------ | ------- | ------------------------------------------------- |
| **AAA**  | Green  | ≥ 7:1   | Passes enhanced contrast for all text sizes       |
| **AA**   | Green  | ≥ 4.5:1 | Passes standard contrast for all text sizes       |
| **AA18** | Orange | ≥ 3:1   | Passes only for large text (≥ 18pt / ≥ 14pt bold) |
| **Fail** | Red    | < 3:1   | Fails all WCAG contrast criteria                  |

## What counts as "large text"?

WCAG defines large text as:

- **18pt** (24px) or larger at normal weight
- **14pt** (18.66px) or larger at **bold** weight

This roughly corresponds to heading sizes in most designs. Body text at 16px regular weight is _not_ large text.

## Tips for choosing accessible colors

1. **Start with your body text** — aim for at least AA (4.5:1) on your primary text color
2. **Check both themes** — a color that passes in light mode may fail in dark mode (use [Token Comparison](/compare) to document both variants)
3. **Don't trust your eyes alone** — colors that look fine on your monitor may be unreadable on low-contrast displays or for users with vision impairments
4. **Be cautious with orange and yellow** — warm colors on white backgrounds frequently fail contrast checks
5. **Use AAA for long-form text** — body copy, documentation, and articles benefit from enhanced contrast
