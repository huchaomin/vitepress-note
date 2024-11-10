/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 18:18:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-10 23:05:52
 * @Description  :
 */
import {
  type GlobalThemeOverrides,
  type ConfigProviderProps,
  type LoadingBarProviderProps,
  type NotificationProviderProps,
  type DialogProviderProps,
  type ModalProviderProps,
  type MessageProviderProps,
  zhCN,
  dateZhCN,
} from 'naive-ui'
import naiveUiThemeConfig from './naive-ui-theme-overrides.json'

const themeOverrides: GlobalThemeOverrides = naiveUiThemeConfig

export const configProviderProps: ConfigProviderProps = {
  abstract: true,
  breakpoints: breakpointsTailwind,
  dateLocale: dateZhCN,
  inlineThemeDisabled: true,
  locale: zhCN,
  themeOverrides,
}

export const loadingBarProviderProps: LoadingBarProviderProps = {}
export const notificationProviderProps: NotificationProviderProps = {}
export const dialogProviderProps: DialogProviderProps = {}
export const modalProviderProps: ModalProviderProps = {}
export const messageProviderProps: MessageProviderProps = {}
