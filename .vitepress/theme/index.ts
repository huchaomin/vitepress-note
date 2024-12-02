/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-02 15:36:48
 * @Description  :
 */
import type { Theme } from 'vitepress'

import { NaiveUIProvider, provideCssRenderCollect } from '@/plugins/naive-ui/embedNaiveUiSsr'
import '@/plugins/others/hideWaiting'
import '@/plugins/others/setFontFamily'

import AppEntry from './App.vue'

import '@/assets/css/index.css'

export default {
  enhanceApp: ({ app }) => {
    app.use(piniaInstance)
    provideCssRenderCollect(app)
  },
  Layout: NaiveUIProvider(AppEntry as Component),
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
