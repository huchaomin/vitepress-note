/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:53:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-20 11:20:52
 * @Description  :
 */
import {
  createDiscreteApi,
  useLoadingBar as _useLoadingBar,
  useNotification as _useNotification,
  useDialog as _useDialog,
  useModal as _useModal,
  useMessage as _useMessage,
  type DialogApi,
  type LoadingBarApi,
  type MessageApi,
  type ModalApi,
  type NotificationApi,
} from 'naive-ui'

import {
  configProviderProps,
  loadingBarProviderProps,
  notificationProviderProps,
  dialogProviderProps,
  modalProviderProps,
  messageProviderProps,
} from './providerProps'

export type DiscreteApiType = 'dialog' | 'loadingBar' | 'message' | 'modal' | 'notification'
export type GetApiReturnType<T extends DiscreteApiType> = T extends 'dialog'
  ? DialogApi
  : T extends 'loadingBar'
    ? LoadingBarApi
    : T extends 'message'
      ? MessageApi
      : T extends 'modal'
        ? ModalApi
        : T extends 'notification'
          ? NotificationApi
          : never

const map = new Map()
function getApi<T extends DiscreteApiType>(name: T): GetApiReturnType<T> {
  if (map.has(name)) {
    return map.get(name) as GetApiReturnType<T>
  }
  const { dialog, loadingBar, message, modal, notification } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
    {
      configProviderProps,
      dialogProviderProps,
      loadingBarProviderProps,
      messageProviderProps,
      modalProviderProps,
      notificationProviderProps,
    },
  )
  map.set('dialog', dialog)
  map.set('loadingBar', loadingBar)
  map.set('message', message)
  map.set('modal', modal)
  map.set('notification', notification)
  return map.get(name) as GetApiReturnType<T>
}

/**
  脱离上下文的 API 不会受 n-xxx-provider 的影响，并且和应用上下文中对应组件会使用不同的 DOM 容器。
  如果需要的话，你需要手动同步这些信息。并且最好不要混用两类 API。
  不要在 setup 中调用 createDiscreteApi，可能会有一些意外的问题出现。
 */
function isInSetup() {
  // return getCurrentInstance() !== null
  return false
}

function useDialog() {
  return isInSetup() ? _useDialog() : getApi('dialog')
}

function useLoadingBar() {
  return isInSetup() ? _useLoadingBar() : getApi('loadingBar')
}

function useMessage() {
  return isInSetup() ? _useMessage() : getApi('message')
}

function useModal() {
  return isInSetup() ? _useModal() : getApi('modal')
}

function useNotify() {
  console.log(isInSetup())

  return isInSetup() ? _useNotification() : getApi('notification')
}

export { useDialog, useLoadingBar, useMessage, useModal, useNotify }
