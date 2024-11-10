/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:53:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-10 23:12:36
 * @Description  :
 */
import {
  createDiscreteApi,
  useLoadingBar as _useLoadingBar,
  useNotification as _useNotification,
  useDialog as _useDialog,
  useModal as _useModal,
  useMessage as _useMessage,
} from 'naive-ui'

import {
  configProviderProps,
  loadingBarProviderProps,
  notificationProviderProps,
  dialogProviderProps,
  modalProviderProps,
  messageProviderProps,
} from './providerProps'

function isInSetup() {
  return getCurrentInstance() !== null
}

function useLoadingBar() {
  return isInSetup()
    ? _useLoadingBar()
    : createDiscreteApi(['loadingBar'], {
        configProviderProps,
        loadingBarProviderProps,
      }).loadingBar
}

function useNotify() {
  return isInSetup()
    ? _useNotification()
    : createDiscreteApi(['notification'], {
        configProviderProps,
        notificationProviderProps,
      }).notification
}

function useDialog() {
  return isInSetup()
    ? _useDialog()
    : createDiscreteApi(['dialog'], {
        configProviderProps,
        dialogProviderProps,
      }).dialog
}

function useModal() {
  return isInSetup()
    ? _useModal()
    : createDiscreteApi(['modal'], {
        configProviderProps,
        modalProviderProps,
      }).modal
}

function useMessage() {
  return isInSetup()
    ? _useMessage()
    : createDiscreteApi(['message'], {
        configProviderProps,
        messageProviderProps,
      }).message
}

export { useDialog, useLoadingBar, useMessage, useModal, useNotify }
