import path from 'node:path'
import process from 'node:process'
import type { defineConfig as defineVitepressConfig } from 'vitepress'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse'
import packageJson from '../package.json'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

const envDir = resolveCwd('env')
// https://vitepress.dev/reference/site-config
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  const env = parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
  const { VITE_BASE_URL } = env
  const obj: ReturnType<typeof defineVitepressConfig> = {
    base: VITE_BASE_URL, // 终以斜杠开头和结尾
    // srcExclude
    cacheDir: resolveCwd('.cache/vitepress'),
    cleanUrls: true, // TODO 查看托管平添是否支持
    description: packageJson.description,
    lang: 'zh-CN',
    lastUpdated: true,
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
    transformHead({ assets }) {
      const interFontFileArr = assets.filter((str: string) =>
        /InterVariable[\w\-.]+\.woff2/.test(str),
      )
      const interLinks: [string, Record<string, string>][] = interFontFileArr.map(
        (href: string) => {
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
        },
      )
      const JetBrainsMonoFontFileArr = assets.filter((str) =>
        /JetBrainsMono[\w\-.]+\.woff2/.test(str),
      )
      const obj = {
        Bold: 'screen and (min-width: 769px) and (max-width: 1024px)',
        ExtraBold: 'screen and (min-width: 1025px) and (max-width: 1280px)',
        Medium: 'screen and (max-width: 480px)',
        SemiBold: 'screen and (min-width: 481px) and (max-width: 768px)',
      }
      const JetBrainsMonoLinks: [string, Record<string, string>][] = JetBrainsMonoFontFileArr.map(
        (href) => {
          // 这里[\w-]  和 [\w\-] 相同中间的 - 会被转义
          const result = href.match(/JetBrainsMono-(\w+)\.[\w-]+\.woff2/)![1]
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
        },
      )
      return [...interLinks, ...JetBrainsMonoLinks]
    },
    vite: {
      envDir,
      plugins: [
        envParse({
          dtsPath: resolveCwd('types/env.d.ts'),
        }),
        AutoImport({
          dirs: [resolveCwd('src/plugins/autoImport'), resolveCwd('src/hooks')],
          dts: resolveCwd('types/auto-imports.d.ts'),
          imports: [
            // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
            'vue',
            '@vueuse/core',
          ],
          // eslintrc: {
          //   enabled: true,
          //   filepath: resolveCwd('eslintrc-auto-import.mjs'),
          //   globalsPropValue: 'readonly',
          // },
          include: [/\.[jt]sx?$/, /\.astro$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/, /\.md$/], // md 文件开启
        }),
        Components({
          dirs: [resolveCwd('src/components/autoImport')],
          dts: resolveCwd('types/components.d.ts'),
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // md 文件中开始自动引入
        }),
      ],
      resolve: {
        alias: {
          '@': resolveCwd('src'), // 与导入代码片段不一样 https://vitepress.dev/zh/guide/markdown#import-code-snippets
          img: resolveCwd('src/static/images'),
        },
      },
    },
  }
  return obj
})
