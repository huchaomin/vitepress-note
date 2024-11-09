/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 18:18:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 18:22:26
 * @Description  :
 */
import { type GlobalThemeOverrides, type ConfigProviderProps, zhCN, dateZhCN } from 'naive-ui'
import naiveUiThemeConfig from './naive-ui-theme-overrides.json'

const themeOverrides: GlobalThemeOverrides = naiveUiThemeConfig

export default {
  abstract: true,
  breakpoints: breakpointsTailwind,
  dateLocale: dateZhCN,
  inlineThemeDisabled: true,
  locale: zhCN,
  themeOverrides,
} satisfies ConfigProviderProps
