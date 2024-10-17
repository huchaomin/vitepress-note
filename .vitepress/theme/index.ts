/*
 * @Author       : huchaomin
 * @Date         : 2024-07-23 17:47:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 16:18:46
 * @Description  :
 */
// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
// import DefaultTheme from 'vitepress/theme-without-fonts'
import '@/assets/css/index.css'
import './hideWaiting'
import App from './App.vue'

export default {
  enhanceApp() {},
  Layout: () => {
    return h(App, null, {})
  },
} satisfies Theme // TODO 与 defineConfigWithTheme https://vitepress.dev/zh/guide/custom-theme
