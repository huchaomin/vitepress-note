import path from 'node:path'
import type * as http from 'node:http'
import process from 'node:process'
import type { defineConfig as defineVitepressConfig } from 'vitepress'
import { type ProxyOptions, defineConfig, loadEnv, normalizePath } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import aliasImportChecker from 'vite-plugin-alias-import-checker'
import Inspect from 'vite-plugin-inspect'
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse'
import tailwindcss from '@tailwindcss/vite'
import packageJson from '../package.json'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

function bypass(req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions): void {
  const reqUrl = req.url ?? ''
  const proxyUrl = new URL(options.rewrite?.(reqUrl) ?? reqUrl, options.target as string).href ?? ''
  res.setHeader('X-Res-ProxyUrl', proxyUrl) // 查看真实的请求地址
}

const envDir = resolveCwd('env')
// https://vitepress.dev/reference/site-config
export default defineConfig(({ command, mode }) => {
  // loadEnv 设置第三个参数为空 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const env = parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
  const { VITE_BASE_URL, VITE_PORT, VITE_PROXY_TARGET } = env
  console.log({
    command,
    env,
    mode,
  })
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
          // const excludeFiles = ['.vite/manifest.json']
          const excludeFiles:any[] = []
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
    cacheDir: resolveCwd('.cache/vitepress'),
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
            { link: 'tools/tailwindcss', text: 'tailwindcss' },
            { link: 'tools/vite', text: 'vite' },
            { link: 'tools/vitePress', text: 'vitePress' },
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
      clearScreen:false,
      envDir,
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
      plugins: [
        tailwindcss(),
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
          extensions: ['vue', 'md'], // md文件也可以作为组件
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // md 文件中开始自动引入
        }),
        aliasImportChecker(),
        Inspect({
          // build: true, // build 模式下启用
          outputDir: resolveCwd('.cache/inspect/.vite-inspect'),
        }),
        visualizer({
          // TODO 会打开两遍 (client、server)
          filename: resolveCwd('.cache/visualizer/report.html'),
          open: true,
        }),
      ],
      resolve: {
        alias: {
          '@': resolveCwd('src'), // 与导入代码片段不一样 https://vitepress.dev/zh/guide/markdown#import-code-snippets
          img: resolveCwd('src/static/images'),
        },
        // https://cn.vitejs.dev/guide/performance.html#reduce-resolve-operations
        // 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
        extensions: ['.ts', '.js'],
      },
      server: {
        host: '0.0.0.0',
        open: false,
        strictPort: true,
        port: VITE_PORT,
        proxy: {
          [`${env.VITE_BASE_URL}${env.VITE_API_PREFIX}/`]: {
            bypass,
            changeOrigin: true,
            rewrite: (p) => {
              return p.replace(new RegExp(env.VITE_BASE_URL), '')
            },
            target: VITE_PROXY_TARGET,
          },
        },
      },
    },
  }
  return obj
})
