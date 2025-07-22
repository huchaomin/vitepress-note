/*
 * @Author       : peter
 * @Date         : 2024-11-08 18:18:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-02 09:23:01
 * @Description  :
 */
import {
  type ConfigProviderProps,
  darkTheme,
  dateZhCN,
  type DialogProviderProps,
  lightTheme,
  type LoadingBarProviderProps,
  type MessageProviderProps,
  type ModalProviderProps,
  type NotificationProviderProps,
  zhCN,
} from 'naive-ui'

import {
  common as themeOverridesCommon,
  dark as themeOverridesDark,
  light as themeOverridesLight,
} from './naive-ui-theme-overrides.ts'

const isDark = ref(false)

export const configProviderProps: ConfigProviderProps = reactive({
  abstract: true,
  breakpoints: breakpointsTailwind,
  dateLocale: dateZhCN,
  inlineThemeDisabled: true,
  locale: zhCN,
  theme: computed(() => (isDark.value ? darkTheme : lightTheme)),
  themeOverrides: computed(() => {
    const common = themeOverridesCommon
    return isDark.value
      ? _.merge({}, common, themeOverridesDark)
      : _.merge({}, common, themeOverridesLight)
  }),
})

export type PlacementType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right'

export function changeProviderTheme(dark: boolean): void {
  isDark.value = dark
}

const messagePlacement = ref<PlacementType>('top')
const notificationPlacement = ref<PlacementType>('top-right')

export { messagePlacement, notificationPlacement }

export const loadingBarProviderProps: LoadingBarProviderProps = {}
export const notificationProviderProps: NotificationProviderProps = reactive({
  placement: notificationPlacement,
})
export const dialogProviderProps: DialogProviderProps = {}
export const modalProviderProps: ModalProviderProps = {}
export const messageProviderProps: MessageProviderProps = reactive({
  placement: messagePlacement,
})
