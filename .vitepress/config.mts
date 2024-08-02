import { defineConfig } from 'vitepress'
import packageJson from '../package.json'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: packageJson.productName, // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
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
  // srcExclude
  outDir: './docs',
  cacheDir: './.cache',
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
  },
  // @ts-expect-error 原本类型定义错误
  transformHead({ assets }) {
    const interFontFileArr = assets.filter(str => /InterVariable(\w|-|\.)+\.woff2/.test(str))
    const interLinks = interFontFileArr.map(href => {
      return   [
        'link',
        {
          rel: 'preload',
          href,
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        }
      ]
    })
    const JetBrainsMonoFontFileArr = assets.filter(str => /JetBrainsMono(\w|-|\.)+\.woff2/.test(str))
    const obj = {
      Medium: 'screen and (max-width: 480px)',
      SemiBold: 'screen and (min-width: 481px) and (max-width: 768px)',
      Bold: 'screen and (min-width: 769px) and (max-width: 1024px)',
      ExtraBold: 'screen and (min-width: 1025px) and (max-width: 1280px)',
    }
    const JetBrainsMonoLinks = JetBrainsMonoFontFileArr.map(href => {
      const result = href.match(/JetBrainsMono-(\w+)\.((?:\w|-)+)\.woff2/)![1]
      const key = result.endsWith('Italic') ? result.slice(0, -6) : result
      return   [
        'link',
        {
          rel: 'preload',
          href,
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
          media: obj[key]
        }
      ]
    })
    return [...interLinks, ...JetBrainsMonoLinks]
  },
  vite:{
    plugins:[
      AutoImport({
        dts: '../../types/auto-imports.d.ts',
        imports: [
          // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
          'vue',
          '@vueuse/core',
        ],
        // defaultExportByFilename: true,
        // dirs: ['src/plugins/autoImport'],
        // eslintrc: {
        //   enabled: true,
        //   globalsPropValue: 'readonly',
        //   filepath: 'eslintrc-auto-import.json',
        // },
      }),
    ]
  }
})
