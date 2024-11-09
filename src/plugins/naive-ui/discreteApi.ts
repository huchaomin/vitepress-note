/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:53:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-09 10:58:00
 * @Description  :
 */
import {
  type NotificationProviderProps,
  type LoadingBarProviderProps,
  createDiscreteApi,
} from 'naive-ui'

import configProviderProps from './configProviderProps'

function useLoadingBar(loadingBarProviderProps?: LoadingBarProviderProps) {
  const { loadingBar } = createDiscreteApi(['loadingBar'], {
    configProviderProps,
    loadingBarProviderProps,
  })
  return loadingBar
}

function useNotify(notificationProviderProps?: NotificationProviderProps) {
  const { notification } = createDiscreteApi(['notification'], {
    configProviderProps,
    notificationProviderProps,
  })
  return notification
}

export { useLoadingBar, useNotify }
