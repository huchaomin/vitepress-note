import { defineConfig } from 'vitepress'
import packageJson from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: packageJson.productName,
  description: packageJson.description,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  base: '/', // 终以斜杠开头和结尾
  srcDir: './src',
  cleanUrls: true, // TODO 查看托管平添是否支持
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      lazyLoading: true
    },
     // markdown-it-anchor 的选项
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    // anchor: {
    //   permalink: markdownItAnchor.permalink.headerLink()
    // },
    // @mdit-vue/plugin-toc 的选项
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    // toc: { level: [1, 2] },
    // config: (md) => {
    //   // 使用更多的 Markdown-it 插件！
    //   md.use(markdownItFoo)
    // }
  }
})
