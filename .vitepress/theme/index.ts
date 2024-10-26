/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-26 17:08:54
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
// import DefaultTheme from 'vitepress/theme-without-fonts'
import { NaiveUIProvider, provideCssRenderCollect } from './embedNaiveUiSsr'
import '@/assets/css/index.css'
import './hideWaiting'
import store from '@/store/index.ts'

export default {
  enhanceApp: ({ app }) => {
    app.use(store)
    provideCssRenderCollect(app)
  },
  Layout: NaiveUIProvider,
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
