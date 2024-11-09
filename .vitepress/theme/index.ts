/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 18:15:09
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
// import DefaultTheme from 'vitepress/theme-without-fonts'
import { NaiveUIProvider, provideCssRenderCollect } from '@/plugins/naive-ui/embedNaiveUiSsr'
import AppEntry from './App.vue'
import '@/assets/css/index.css'
import './hideWaiting'
import store from '@/store/index.ts'

export default {
  enhanceApp: ({ app }) => {
    app.use(store)
    provideCssRenderCollect(app)
  },
  Layout: NaiveUIProvider(AppEntry as Component),
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
