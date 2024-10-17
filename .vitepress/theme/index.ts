/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 17:21:15
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
// import DefaultTheme from 'vitepress/theme-without-fonts'
import { NaiveUIProvider, provideCssRenderCollect } from './embedNaiveUiSsr'
import '@/assets/css/index.css'
import './hideWaiting'

export default {
  enhanceApp: ({ app }) => {
    provideCssRenderCollect(app)
  },
  Layout: NaiveUIProvider,
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
