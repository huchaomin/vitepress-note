/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-18 17:13:40
 * @Description  :
 */
import type { Theme } from 'vitepress'

import { NaiveUIProvider, provideCssRenderCollect } from '@/plugins/naive-ui/embedNaiveUiSsr'
import { inBrowser } from 'vitepress'
import '@/plugins/others/hideWaiting'
import '@/plugins/others/setFontFamily'

import AppEntry from './App.vue'

import '@/assets/css/index.css'

export default {
  enhanceApp: ({ app, router }) => {
    app.use(piniaInstance)
    provideCssRenderCollect(app)
    router.onBeforeRouteChange = () => {
      $loading.show()
    }
    router.onAfterPageLoad = () => {}
    router.onAfterRouteChanged = (to: string) => {
      $loading.hide()
      if (inBrowser) {
        if (window._hmt) {
          window._hmt.push(['_trackPageview', to])
        }
        const uuid = router.route.data.frontmatter.uuid as string | undefined
        if (uuid) {
          let meta = document.querySelector('meta[property="og:title"]')
          if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('property', 'og:title')
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', uuid)
        }
      }
    }
  },
  Layout: NaiveUIProvider(AppEntry as Component),
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
