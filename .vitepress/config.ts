/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-30 23:01:37
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-18 23:34:02
 * @Description  :
 */
import type { defineConfig as defineVitepressConfig } from 'vitepress'

import { defineConfig, normalizePath } from 'vite'
import viteCompression from 'vite-plugin-compression'

import sidebar from '../build/plugins/generateSidebar.ts'
import mdPlugin from '../build/plugins/md/index.ts'
import postHandleHtml from '../build/plugins/postHandleHtml.ts'
import { getEnv, mdPageDir, normalizeJoinPath, resolveCwd } from '../build/utils/index.ts'
import packageJson from '../package.json' assert { type: 'json' }
import { search as zhSearch } from './zh.ts'

// https://vitepress.dev/reference/site-config 这里面定义了的， vite.config.ts 里面就不能定义了
export default defineConfig(({ mode }) => {
  const env = getEnv(mode)
  const { VITE_BASE_URL } = env
  const obj: ReturnType<typeof defineVitepressConfig> = {
    base: VITE_BASE_URL, // 终以斜杠开头和结尾(没有结尾vite会自动处理)
    async buildEnd(siteConfig) {
      const { outDir } = siteConfig.userConfig
      // @ts-expect-error TODO
      // eslint-disable-next-line ts/no-unsafe-assignment
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
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
      obj.configResolved({
        build: {
          outDir,
        },
      })
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
      await obj.closeBundle()
    },
    // srcExclude
    cacheDir: resolveCwd('build/.cache/vitepress'),
    cleanUrls: true, // TODO 查看托管平添是否支持
    contentProps: {
      class: 'overflow-hidden',
    },
    description: packageJson.description,
    head: [['link', { href: normalizeJoinPath(VITE_BASE_URL, 'favicon.ico'), rel: 'icon' }]],
    lang: 'zh-Hans',
    markdown: {
      // markdown-it-anchor 的选项 这里只需提供一个id其他的，下面config里面自定义
      // https://github.com/valeriangalliat/markdown-it-anchor#usage
      anchor: {
        permalink: undefined,
        tabIndex: false,
      },
      // @mdit-vue/plugin-toc 的选项
      // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
      // toc: { level: [1, 2] },
      config: (md) => {
        md.use(mdPlugin)
      },
      container: {
        dangerLabel: '危险',
        detailsLabel: '详细信息',
        infoLabel: '信息',
        tipLabel: '提示',
        warningLabel: '警告',
      },
      lineNumbers: true,
      theme: { dark: 'github-dark', light: 'github-light' },
    },
    metaChunk: true,
    outDir: resolveCwd('docs'), // 不能放到 vite.config.ts 里面，否则会报错
    rewrites: {
      'index/index.md': 'index.md',
    },
    sitemap: {
      hostname: 'https://mulinzi.cn/',
    },
    srcDir: resolveCwd(mdPageDir),
    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
      // 右边的导航栏
      outline: {
        level: [2, 3],
      },
      search: {
        options: {
          apiKey: 'c0328584ea02561c5e46c635aeb331e5',
          appId: 'ZHEDSTO6YB',
          indexName: 'crawler_mulinzi_note',
          locales: {
            ...zhSearch,
          },
        },
        provider: 'algolia',
      },
      sidebar,
    },
    title: packageJson.productName, // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
    titleTemplate: false, // 去掉标题里面的 ’| vite‘
    transformHead({ page, pageData }) {
      let pageStr = page
      if (pageStr.endsWith('/index.md')) {
        pageStr = pageStr.replace('/index.md', '')
      }
      if (pageStr.endsWith('.md')) {
        pageStr = pageStr.replace('.md', '')
      }
      const keywords = pageStr.split('/').reverse().join(',')
      console.log(keywords)
      const headArr = [] as Array<[string, Record<string, string>]>
      if (
        pageData.description === null &&
        headArr.find((h) => h[0] === 'meta' && h[1].name === 'description') === undefined
      ) {
        headArr.push(['meta', { content: keywords, name: 'description' }])
      }
      if (headArr.find((h) => h[0] === 'meta' && h[1].name === 'keywords') === undefined) {
        headArr.push(['meta', { content: keywords, name: 'keywords' }])
      }
      return headArr
    },
    transformHtml(code) {
      return postHandleHtml(code)
    },
    vite: {
      configFile: resolveCwd('build/vite.config.ts'),
    },
  }
  return obj
})
