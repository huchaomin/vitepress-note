/*
 * @Author       : huchaomin
 peter@qingcongai.com
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-14 00:06:19
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@/assets/css/index.css'

export default {
  // Vue 应用实例, 路由实例, 站点数据
  enhanceApp({ app, router, siteData }) {
    // 注册自定义全局组件
    // 找个时间 清除waiting, opacity 动画结束时，移除自己
    //  app.component('MyGlobalComponent' /* ... */)
  },
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
    })
  },
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
