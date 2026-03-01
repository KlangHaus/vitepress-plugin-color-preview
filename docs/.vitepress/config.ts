import { defineConfig } from 'vitepress'
import { colorPreviewPlugin, colorPreviewTransformer } from '../../src/index'

export default defineConfig({
  title: 'Color Preview',
  description: 'Automatic color swatches for your VitePress documentation',
  base: '/vitepress-plugin-color-preview/',
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
          { text: 'Tailwind Classes', link: '/tailwind' },
          { text: 'Supported Formats', link: '/formats' },
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
