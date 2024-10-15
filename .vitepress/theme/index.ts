/*
 * @Author       : huchaomin
 peter@qingcongai.com
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-15 14:37:04
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@/assets/css/index.css'
import hideWaiting from './hideWaiting'

if (!import.meta.env.SSR && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    hideWaiting()
  })
}
export default {
  // Vue 应用实例, 路由实例, 站点数据
  enhanceApp({ app, router, siteData }) {
    //  app.component('MyGlobalComponent' /* ... */)
  },
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
    })
  },
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
