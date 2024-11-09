/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:53:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-09 11:46:52
 * @Description  :
 */
import {
  type NotificationProviderProps,
  type LoadingBarProviderProps,
  type DialogProviderProps,
  type ModalProviderProps,
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

function useDialog(dialogProviderProps?: DialogProviderProps) {
  const { dialog } = createDiscreteApi(['dialog'], {
    configProviderProps,
    dialogProviderProps,
  })
  return dialog
}

function useModal(modalProviderProps?: ModalProviderProps) {
  const { modal } = createDiscreteApi(['modal'], {
    configProviderProps,
    modalProviderProps,
  })
  return modal
}

export { useDialog, useLoadingBar, useModal, useNotify }
