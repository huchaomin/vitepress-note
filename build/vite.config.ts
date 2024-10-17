/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-12 14:40:58
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 16:44:28
 * @Description  :
 */
import type * as http from 'node:http'
import { type ProxyOptions, defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import aliasImportChecker from 'vite-plugin-alias-import-checker'
import Inspect from 'vite-plugin-inspect'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { envDir, getEnv, resolveCwd, normalizeJoinPath } from './utils/index.ts'
import { envParse } from 'vite-plugin-env-parse'

function bypass(req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions): void {
  const reqUrl = req.url ?? ''
  const proxyUrl = new URL(options.rewrite?.(reqUrl) ?? reqUrl, options.target as string).href ?? ''
  res.setHeader('X-Res-ProxyUrl', proxyUrl) // 查看真实的请求地址
}

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  const env = getEnv(mode)
  const { VITE_API_PREFIX, VITE_BASE_URL, VITE_PORT, VITE_PROXY_TARGET } = env
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
        nonStandard: {
          deepSelectorCombinator: true, // TODO 好像不支持  :deep
        },
        // TODO https://cn.vitejs.dev/config/shared-options#css-lightningcss
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
      transformer: 'lightningcss',
    },
    envDir,
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    plugins: [
      // https://github.com/unplugin/unplugin-icons?tab=readme-ov-file
      // https://github.com/unplugin/unplugin-icons/blob/main/examples/vite-vue3/vite.config.ts
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader(resolveCwd('src/assets/icons')),
        },
      }),
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
        //   filepath: resolveCwd('eslintrc-auto-import.js'),
        //   globalsPropValue: 'readonly',
        // },
        include: [/\.[jt]sx?$/, /\.astro$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/, /\.md$/], // md 文件开启
        vueTemplate: true, // solve When auto-import a ref, inline operations won't be auto unwrapped. [https://github.com/unjs/unimport/pull/15]
      }),
      Components({
        dirs: [resolveCwd('src/components/autoImport')],
        dts: resolveCwd('types/components.d.ts'),
        extensions: ['vue', 'md'], // md文件也可以作为组件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // md 文件中开始自动引入
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            customCollections: ['custom'],
          }),
        ],
      }),
      aliasImportChecker(),
      tailwindcss(),
      Inspect({
        // build: true, // build 模式下启用
        outputDir: resolveCwd('build/.cache/inspect/.vite-inspect'),
      }),
      visualizer({
        // TODO 会打开两遍 (client、server)
        filename: resolveCwd('build/.cache/visualizer/report.html'),
        open: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolveCwd('src'), // 与导入代码片段不一样 https://vitepress.dev/zh/guide/markdown#import-code-snippets
        font: resolveCwd('src/assets/fonts'), // 看看升级到 vite 6 以后会不会有问题
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
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },
  }
})
