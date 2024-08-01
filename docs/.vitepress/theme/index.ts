/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2024-08-01 18:33:09
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './fonts/inter.css'
import './_vars.scss'
import './_others.scss'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // Vue 应用实例, 路由实例, 站点数据
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
