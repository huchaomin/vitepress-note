import { resolveCwd, getEnv } from '../build/utils/index.ts'
import type { defineConfig as defineVitepressConfig } from 'vitepress'
import { defineConfig, normalizePath } from 'vite'
import viteCompression from 'vite-plugin-compression'
import packageJson from '../package.json'

// https://vitepress.dev/reference/site-config 这里面定义了的， vite.config.ts 里面就不能定义了
export default defineConfig(({ mode }) => {
  const env = getEnv(mode)
  const { VITE_BASE_URL } = env
  const obj: ReturnType<typeof defineVitepressConfig> = {
    base: VITE_BASE_URL, // 终以斜杠开头和结尾(没有结尾vite会自动处理)
    async buildEnd(siteConfig) {
      const { outDir } = siteConfig.userConfig
      /* eslint-disable ts/no-unsafe-assignment,ts/no-unsafe-call,ts/no-unsafe-member-access */
      // @ts-expect-error 不知为啥类型错误, 这里要压缩html, 才要这做，按照官方配置只能压缩非html文件，因为插件运行期间html还没生成
      const obj = viteCompression({
        filter: (file: string) => {
          const normalizePathFile = normalizePath(file)
          const defaultReg = /\.(?:js|mjs|json|css|html)$/i
          const excludeFiles = ['manifest.json']
          return (
            defaultReg.test(normalizePathFile) &&
            !excludeFiles.some((item) => normalizePathFile.includes(item))
          )
        },
        verbose: false,
      })
      obj.configResolved({
        build: {
          outDir,
        },
      })
      await obj.closeBundle()
      /* eslint-enable ts/no-unsafe-assignment,ts/no-unsafe-call,ts/no-unsafe-member-access */
    },
    // srcExclude
    cacheDir: resolveCwd('build/.cache/vitepress'),
    cleanUrls: true, // TODO 查看托管平添是否支持
    description: packageJson.description,
    head: [['link', { href: `${VITE_BASE_URL}/favicon.ico`, rel: 'icon' }]],
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
    outDir: resolveCwd('docs'), // 不能放到 vite.config.ts 里面，否则会报错
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
            { link: 'tools/tailwindcss', text: 'tailwindcss' },
            { link: 'tools/vite', text: 'vite' },
            { link: 'tools/vitePress', text: 'vitePress' },
            { link: 'css/@rules/@layer', text: '@layer' },
            { link: 'css/@rules/@media', text: '@media' },
            { link: 'css/css变量', text: 'css变量' },
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
      configFile: resolveCwd('build/vite.config.ts'),
    },
  }
  return obj
})