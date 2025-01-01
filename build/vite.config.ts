/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-12 14:40:58
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-01 14:23:20
 * @Description  :
 */
import type * as http from 'node:http'

import tailwindcss from '@tailwindcss/vite'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, type ProxyOptions } from 'vite'
import aliasImportChecker from 'vite-plugin-alias-import-checker'
import { envParse } from 'vite-plugin-env-parse'
import Font from 'vite-plugin-font'
import Inspect from 'vite-plugin-inspect'

import autoImportStoreList from './plugins/autoImportStores.ts'
import { envDir, getEnv, normalizeJoinPath, resolveCwd } from './utils/index.ts'

function bypass(req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions): void {
  const reqUrl = req.url ?? ''
  const proxyUrl = new URL(options.rewrite?.(reqUrl) ?? reqUrl, options.target as string).href ?? ''
  res.setHeader('X-Res-ProxyUrl', proxyUrl) // 查看真实的请求地址
}

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, isSsrBuild, mode }) => {
  const env = getEnv(mode)
  const { VITE_API_PREFIX, VITE_BASE_URL, VITE_PORT, VITE_PROXY_TARGET, VITE_SHOW_RIGHT_FONT } = env
  console.log({
    command,
    env,
    mode,
  })
  return {
    build: {
      cssMinify: 'lightningcss',
    },
    clearScreen: false,
    css: {
      lightningcss: {
        // TODO https://cn.vitejs.dev/config/shared-options#css-lightningcss
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
      transformer: 'lightningcss',
    },
    envDir,
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      include: [
        'three',
        'three.interactive',
        'gsap',
        'd3-geo',
        'three/examples/jsm/renderers/CSS3DRenderer.js',
        '@formkit/auto-animate',
        'three/examples/jsm/controls/OrbitControls.js',
        'three/examples/jsm/loaders/GLTFLoader.js',
        'three/examples/jsm/loaders/DRACOLoader.js',
        'pinia-plugin-persistedstate',
        '@css-render/vue3-ssr',
        'naive-ui',
        'echarts/core',
        'vue-echarts',
        'echarts/components',
        'echarts/charts',
        'echarts/renderers',
        '@lottiefiles/dotlottie-vue',
        'alova',
        'alova/fetch',
        'alova/vue',
        'dayjs',
        '@giscus/vue',
        'lodash-es',
      ],
    },
    plugins: [
      // https://github.com/unplugin/unplugin-icons?tab=readme-ov-file
      // https://github.com/unplugin/unplugin-icons/blob/main/examples/vite-vue3/vite.config.ts
      // 搭配 Iconify IntelliSense 插件使用更香
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader(resolveCwd('src/assets/icons')),
        },
      }),
      // @ts-expect-error 这里类型错误
      // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-call
      ...(mode === 'production' || VITE_SHOW_RIGHT_FONT ? [Font.vite()] : []),
      envParse({
        dtsPath: resolveCwd('types/env.d.ts'),
      }),
      AutoImport({
        dirs: [resolveCwd('src/plugins/autoImport'), resolveCwd('src/hooks')],
        dts: resolveCwd('types/auto-imports.d.ts'),
        imports: [
          // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
          'vue',
          'pinia',
          '@vueuse/core',
          {
            from: '@vueuse/integrations/useCookies',
            imports: ['useCookies'],
          },
          autoImportStoreList,
          {
            from: 'alova/client',
            imports: ['useRequest', 'useWatcher', 'usePagination '],
          },
          {
            from: '@/components/autoImport/CForm.vue',
            imports: ['FormItemType'],
            type: true,
          },
          {
            from: '@/components/autoImport/CInput.vue',
            imports: ['CInputPropsType'],
            type: true,
          },
          {
            from: '@/store/index.ts',
            imports: [['default', 'piniaInstance']],
          },
        ],
        // eslintrc: {
        //   enabled: true,
        //   filepath: resolveCwd('eslintrc-auto-import.js'),
        //   globalsPropValue: 'readonly',
        // },
        include: [/\.[jt]sx?$/, /\.astro$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/, /\.md$/], // md 文件开启
        vueTemplate: true, // solve When auto-import a ref, inline operations won't be auto unwrapped. [https://github.com/unjs/unimport/pull/15]
      }),
      Components({
        dirs: [
          resolveCwd('src/components/autoImport'),
          resolveCwd('.vitepress/theme/components/autoImport'),
        ],
        dts: resolveCwd('types/components.d.ts'),
        extensions: ['vue', 'md'], // md文件也可以作为组件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // md 文件中开始自动引入
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            customCollections: ['custom'],
          }),
          // 为什么下面的写法不行呢
          // {
          //   resolve: (name) => {
          //     if (name === 'FenceWrapper') {
          //       return {
          //         from: '.vitepress/theme/components/FenceWrapper.vue',
          //         name,
          //       }
          //     }
          //   },
          //   type: 'component',
          // },
        ],
      }),
      aliasImportChecker(),
      tailwindcss(),
      Inspect({
        build: true, // build 模式下启用
        outputDir: resolveCwd(`build/.cache/inspect/${isSsrBuild ? 'ssr' : 'client'}`),
      }),
      visualizer({
        filename: resolveCwd(
          `build/.cache/visualizer/${isSsrBuild ? 'ssr' : 'client'}/report.html`,
        ),
        open: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolveCwd('src'), // 与导入代码片段不一样 https://vitepress.dev/zh/guide/markdown#import-code-snippets
        img: resolveCwd('src/assets/images'),
      },
      // https://cn.vitejs.dev/guide/performance.html#reduce-resolve-operations
      // 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
      extensions: ['.ts', '.js'],
    },
    server: {
      host: '0.0.0.0',
      open: false,
      port: VITE_PORT,
      proxy: {
        [normalizeJoinPath(VITE_BASE_URL, VITE_API_PREFIX)]: {
          bypass,
          changeOrigin: true,
          rewrite: (p) => {
            return VITE_BASE_URL === '/' ? p : p.replace(new RegExp(VITE_BASE_URL), '')
          },
          target: VITE_PROXY_TARGET,
        },
      },
      strictPort: true,
    },
    ssr: {
      // TODO '@docsearch/css' ?
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },
  }
})
