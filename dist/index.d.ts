import MarkdownIt from 'markdown-it';

/**
 * markdown-it plugin that adds color swatch previews to:
 * 1. Inline code blocks containing CSS color values or Tailwind classes
 * 2. :::colors palette containers
 */
declare function colorPreviewPlugin(md: MarkdownIt): void;

interface HastText {
    type: 'text';
    value: string;
}
interface HastElement {
    type: 'element';
    tagName: string;
    properties: Record<string, unknown>;
    children: (HastElement | HastText)[];
}
/**
 * Shiki transformer that adds color swatches to color values
 * inside fenced code blocks.
 *
 * Usage in VitePress config:
 * ```ts
 * markdown: {
 *   codeTransformers: [colorPreviewTransformer()]
 * }
 * ```
 */
declare function colorPreviewTransformer(): {
    name: string;
    span: (node: HastElement) => void;
};

/** Regex patterns for matching CSS color values */
/**
 * Check if an entire string is exactly a named CSS color.
 */
declare function isNamedColor(text: string): boolean;
/**
 * Extract the first CSS color value from a string,
 * or return the string itself if it's a named color.
 * Only matches if the color IS the entire content.
 */
declare function extractColor(text: string): string | null;
interface ColorMatch {
    value: string;
    index: number;
    length: number;
}
/**
 * Find all CSS color values within a string.
 * Used for fenced code blocks where colors appear within larger text.
 */
declare function findColorsInText(text: string): ColorMatch[];

/**
 * Check if a string is a Tailwind color utility class
 * and return the resolved hex color value.
 */
declare function extractTailwindColor(text: string): string | null;

export { colorPreviewPlugin, colorPreviewTransformer, extractColor, extractTailwindColor, findColorsInText, isNamedColor };
