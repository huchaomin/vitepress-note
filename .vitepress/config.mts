import path from 'node:path'
import { defineConfig, loadEnv } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse'
import packageJson from '../package.json'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

// https://vitepress.dev/reference/site-config
const envDir = resolveCwd('env')
// @ts-expect-error vitepress 的类型定义错误
export default defineConfig(({ command, mode }) => {
  const env = parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
  const { VITE_BASE_URL } = env
  return {
    lang: 'zh-CN',
    title: packageJson.productName, // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
    description: packageJson.description,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' },
      ],

      sidebar: [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      ],
    },
    base: VITE_BASE_URL, // 终以斜杠开头和结尾
    srcDir: resolveCwd('src/pages'),
    // srcExclude
    outDir: resolveCwd('docs'),
    cacheDir: resolveCwd('.cache/vitepress'),
    cleanUrls: true, // TODO 查看托管平添是否支持
    lastUpdated: true,
    markdown: {
      container: {
        tipLabel: '提示',
        warningLabel: '警告',
        dangerLabel: '危险',
        infoLabel: '信息',
        detailsLabel: '详细信息',
      },
      image: {
        lazyLoading: true,
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
    transformHead({ assets }: { assets: string[] }) {
      const interFontFileArr = assets.filter((str: string) => /InterVariable([\w\-.])+\.woff2/.test(str))
      const interLinks = interFontFileArr.map((href: string) => {
        return [
          'link',
          {
            rel: 'preload',
            href,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          },
        ]
      })
      const JetBrainsMonoFontFileArr = assets.filter(str => /JetBrainsMono([\w\-.])+\.woff2/.test(str))
      const obj = {
        Medium: 'screen and (max-width: 480px)',
        SemiBold: 'screen and (min-width: 481px) and (max-width: 768px)',
        Bold: 'screen and (min-width: 769px) and (max-width: 1024px)',
        ExtraBold: 'screen and (min-width: 1025px) and (max-width: 1280px)',
      }
      const JetBrainsMonoLinks = JetBrainsMonoFontFileArr.map((href) => {
        const result = href.match(/JetBrainsMono-(\w+)\.((?:\w|-)+)\.woff2/)![1]
        const key = result.endsWith('Italic') ? result.slice(0, -6) : result
        return [
          'link',
          {
            rel: 'preload',
            href,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
            media: obj[key as keyof typeof obj],
          },
        ]
      })
      return [...interLinks, ...JetBrainsMonoLinks]
    },
    vite: {
      envDir,
      plugins: [
        envParse({
          dtsPath: resolveCwd('types/env.d.ts'),
        }),
        AutoImport({
          dts: resolveCwd('types/auto-imports.d.ts'),
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
      ],
      resolve: {
        alias: {
          '@': resolveCwd('src'),
          'img': resolveCwd('src/static/images'),
        },
      },
    },
  }
})
