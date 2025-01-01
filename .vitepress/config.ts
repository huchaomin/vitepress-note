/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-30 23:01:37
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-01 09:25:31
 * @Description  :
 */
import type { defineConfig as defineVitepressConfig } from 'vitepress'

import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig, normalizePath } from 'vite'
import viteCompression from 'vite-plugin-compression'

import sidebar from '../build/plugins/generateSidebar.ts'
import mdPlugin from '../build/plugins/md/index.ts'
import postHandleHtml from '../build/plugins/postHandleHtml.ts'
import {
  extractKeywordsFromPath,
  getEnv,
  mdPageDir,
  normalizeJoinPath,
  resolveCwd,
} from '../build/utils/index.ts'
import packageJson from '../package.json' assert { type: 'json' }

// https://vitepress.dev/reference/site-config 这里面定义了的， vite.config.ts 里面就不能定义了
export default withPwa(
  defineConfig(({ mode }) => {
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
        // VPDoc class 获取h标题时使用/爬虫时的配置使用
        class: 'VPDoc',
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
      pwa: {
        // https://vite-pwa-org-zh.netlify.app/frameworks/vitepress.html
        experimental: {
          includeAllowlist: true, // TODO
        },
        manifest: {
          display: 'standalone', // 独立应用模式
          icons: [
            {
              sizes: '192x192',
              src: 'logo.png',
              type: 'image/png',
            },
            {
              sizes: '512x512',
              src: 'logo.png',
              type: 'image/png',
            },
            {
              purpose: 'any maskable',
              sizes: '512x512',
              src: 'logo.png',
              type: 'image/png',
            },
          ],
          name: 'VitePress PWA',
          orientation: 'portrait', // 竖屏模式
          short_name: 'VitePressPWA',
          theme_color: '#ffffff',
        },
        outDir: resolveCwd('docs'),
        srcDir: resolveCwd(`${mdPageDir}/public`),
        workbox: {
          globPatterns: ['**/*.{css,js,html,svg,png,jpg,gif,ico,txt,woff2,gz,xml,json}'],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
        },
      },
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
            apiKey: '1b6e75dc35a57ba306ecd953d4ed8172',
            appId: 'ZHEDSTO6YB',
            indexName: 'mulinzi_note',
            locales: {
              zh: {
                placeholder: '搜索文档',
                translations: {
                  button: {
                    buttonAriaLabel: '搜索文档',
                    buttonText: '搜索文档',
                  },
                  modal: {
                    errorScreen: {
                      helpText: '你可能需要检查你的网络连接',
                      titleText: '无法获取结果',
                    },
                    footer: {
                      closeText: '关闭',
                      navigateText: '切换',
                      searchByText: '搜索提供者',
                      selectText: '选择',
                    },
                    noResultsScreen: {
                      noResultsText: '无法找到相关结果',
                      reportMissingResultsLinkText: '点击反馈',
                      reportMissingResultsText: '你认为该查询应该有结果？',
                      suggestedQueryText: '你可以尝试查询',
                    },
                    searchBox: {
                      cancelButtonAriaLabel: '取消',
                      cancelButtonText: '取消',
                      resetButtonAriaLabel: '清除查询条件',
                      resetButtonTitle: '清除查询条件',
                    },
                    startScreen: {
                      favoriteSearchesTitle: '收藏',
                      noRecentSearchesText: '没有搜索历史',
                      recentSearchesTitle: '搜索历史',
                      removeFavoriteSearchButtonTitle: '从收藏中移除',
                      removeRecentSearchButtonTitle: '从搜索历史中移除',
                      saveRecentSearchButtonTitle: '保存至搜索历史',
                    },
                  },
                },
              },
            },
            searchParameters: {
              attributesToRetrieve: [
                'hierarchy.lvl0',
                'hierarchy.lvl1',
                'hierarchy.lvl2',
                'hierarchy.lvl3',
                'hierarchy.lvl4',
                'hierarchy.lvl5',
                'hierarchy.lvl6',
                'content',
                'type',
                'lvl0Text',
                'url',
              ],
              attributesToSnippet: ['*:21'],
            },
          },
          provider: 'algolia',
        },
        sidebar,
      },
      title: packageJson.productName, // 没有 titleTemplate 它将用作所有单独页面标题的默认后缀
      titleTemplate: false, // 去掉标题里面的 ’| vite‘
      // transformPageData(dev/prod) -> transformHead(prod) -> transformHtml(prod)
      transformHead({ pageData }) {
        const { filePath, frontmatter } = pageData
        const keywords = extractKeywordsFromPath(filePath)
        const headArr = (frontmatter.head ?? []) as Array<[string, Record<string, string>]>
        // 也可以不需要 https://blog.skk.moe/post/say-no-to-meta-keywords/
        const arr: Array<[string, Record<string, string>]> = [
          [
            'meta',
            {
              content:
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
              name: 'viewport',
            },
          ],
        ]
        if (headArr.find((h) => h[0] === 'meta' && h[1].name === 'keywords') === undefined) {
          arr.push(['meta', { content: keywords, name: 'keywords' }])
        }
        return arr
      },
      transformHtml(code) {
        return postHandleHtml(code)
      },
      transformPageData(pageData, { siteConfig }) {
        const keywords = extractKeywordsFromPath(pageData.filePath)
        if (pageData.description === null) {
          pageData.description = `${keywords} web 前端 ${siteConfig.site.description}`
        }
      },
      vite: {
        configFile: resolveCwd('build/vite.config.ts'),
      },
    }
    return obj
  }),
)
