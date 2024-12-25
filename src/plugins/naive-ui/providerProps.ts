/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 18:18:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-25 15:32:14
 * @Description  :
 */
import {
  type ConfigProviderProps,
  dateZhCN,
  type DialogProviderProps,
  type LoadingBarProviderProps,
  type MessageProviderProps,
  type ModalProviderProps,
  type NotificationProviderProps,
  zhCN,
} from 'naive-ui'

import naiveUiThemeConfig from './naive-ui-theme-overrides.ts'

export const configProviderProps: ConfigProviderProps = {
  abstract: true,
  breakpoints: breakpointsTailwind,
  dateLocale: dateZhCN,
  inlineThemeDisabled: true,
  locale: zhCN,
  themeOverrides: naiveUiThemeConfig,
}

export type MessagePlacementType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right'

const messagePlacement = ref<MessagePlacementType>('top')

export { messagePlacement }

export const loadingBarProviderProps: LoadingBarProviderProps = {}
export const notificationProviderProps: NotificationProviderProps = {}
export const dialogProviderProps: DialogProviderProps = {}
export const modalProviderProps: ModalProviderProps = {}
export const messageProviderProps: MessageProviderProps = reactive({
  placement: messagePlacement,
})
