import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse'
import packageJson from '../package.json'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

interface defineConfigFnArgs {
  command: string
  mode: string
}

// https://vitepress.dev/reference/site-config
const envDir = resolveCwd('env')
// @ts-expect-error vitepress 的类型定义错误
export default defineConfig(({ command, mode }: defineConfigFnArgs) => {
  console.log(command, mode)
  const env = parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
  const { VITE_BASE_URL } = env
  return {
    base: VITE_BASE_URL, // 终以斜杠开头和结尾
    // srcExclude
    cacheDir: resolveCwd('.cache/vitepress'),
    cleanUrls: true, // TODO 查看托管平添是否支持
    lastUpdated: true,
    description: packageJson.description,
    lang: 'zh-CN',
    markdown: {
      container: {
        dangerLabel: '危险',
        detailsLabel: '详细信息',
        infoLabel: '信息',
        tipLabel: '提示',
        warningLabel: '警告',
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
    outDir: resolveCwd('docs'),
    srcDir: resolveCwd('src/pages'),
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { link: '/', text: 'Home' },
        { link: '/markdown-examples', text: 'Examples' },
      ],

      sidebar: [
        {
          items: [
            { link: '/markdown-examples', text: 'Markdown Examples' },
            { link: '/api-examples', text: 'Runtime API Examples' },
          ],
          text: 'Examples',
        },
      ],

      socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
    title: packageJson.productName, // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
    transformHead({ assets }: { assets: string[] }) {
      const interFontFileArr = assets.filter((str: string) =>
        /InterVariable[\w\-.]+\.woff2/.test(str),
      )
      const interLinks = interFontFileArr.map((href: string) => {
        return [
          'link',
          {
            as: 'font',
            crossorigin: '',
            href,
            rel: 'preload',
            type: 'font/woff2',
          },
        ]
      })
      const JetBrainsMonoFontFileArr = assets.filter(str =>
        /JetBrainsMono[\w\-.]+\.woff2/.test(str),
      )
      const obj = {
        Bold: 'screen and (min-width: 769px) and (max-width: 1024px)',
        ExtraBold: 'screen and (min-width: 1025px) and (max-width: 1280px)',
        Medium: 'screen and (max-width: 480px)',
        SemiBold: 'screen and (min-width: 481px) and (max-width: 768px)',
      }
      const JetBrainsMonoLinks = JetBrainsMonoFontFileArr.map((href) => {
        const result = href.match(/JetBrainsMono-(\w+)\.[\w\-]+\.woff2/)![1]
        const key = result.endsWith('Italic') ? result.slice(0, -6) : result
        return [
          'link',
          {
            as: 'font',
            crossorigin: '',
            href,
            media: obj[key as keyof typeof obj],
            rel: 'preload',
            type: 'font/woff2',
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
          img: resolveCwd('src/static/images'),
        },
      },
    },
  }
})
