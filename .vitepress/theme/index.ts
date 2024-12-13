/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-13 17:58:35
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
    router.onAfterRouteChanged = (to: string) => {
      $loading.hide()
      if (inBrowser && window._hmt) {
        window._hmt.push(['_trackPageview', to])
      }
    }
  },
  Layout: NaiveUIProvider(AppEntry as Component),
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
