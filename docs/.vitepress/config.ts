import { defineConfig } from 'vitepress'
import { colorPreviewPlugin, colorPreviewTransformer } from '../../src/index'

export default defineConfig({
  title: 'vitepress-plugin-color-preview',
  description: 'Automatic color swatches for your VitePress documentation',
  base: '/vitepress-plugin-color-preview/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-plugin-color-preview/favicon.svg' }],
    ['meta', { property: 'og:title', content: 'vitepress-plugin-color-preview' }],
    ['meta', { property: 'og:description', content: 'Automatic color swatches for your VitePress documentation' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'API', link: '/api' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Inline Colors', link: '/inline' },
          { text: 'Code Blocks', link: '/code-blocks' },
          { text: 'Color Palettes', link: '/palette' },
          { text: 'Color Strips', link: '/strip' },
          { text: 'Token Table', link: '/tokens' },
          { text: 'Token Comparison', link: '/compare' },
          { text: 'Contrast Checker', link: '/contrast' },
          { text: 'Tailwind Classes', link: '/tailwind' },
        ],
      },
      {
        text: 'Understanding',
        items: [
          { text: 'Design Tokens', link: '/understanding-tokens' },
          { text: 'Contrast & WCAG', link: '/understanding-contrast' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API', link: '/api' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KlangHaus/vitepress-plugin-color-preview' },
    ],
  },
  markdown: {
    config(md) {
      md.use(colorPreviewPlugin)
    },
    codeTransformers: [colorPreviewTransformer()],
  },
})
