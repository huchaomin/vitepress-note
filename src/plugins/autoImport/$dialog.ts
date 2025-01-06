/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-04 11:31:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-04 23:35:43
 * @Description  :
 */

import type { DialogOptions, DialogReactive, MessageApi } from 'naive-ui'

import { useDialog } from '@/plugins/naive-ui/discreteApi'

enum DialogTypes {
  create = 'create', // 其实创建的也是一个 info, 即使 type 传 undefined
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

interface DestroyAll {
  destroyAll: MessageApi['destroyAll']
}

type DialogContentOptions = NonNullable<DialogOptions['content']>

type DialogTypesValues = keyof typeof DialogTypes

type Others = {
  // 映射类型和函数类型不能写在一起
  [key in DialogTypes]: OthersType
}

type OthersType = (
  content: DialogContentOptions,
  options?: Omit<DialogOptions, 'content' | 'type'>,
) => DialogReactive

const create: OthersType = (...arg) => {
  return useInject('info', ...arg)
}

function useInject(
  type: DialogTypesValues,
  content: DialogContentOptions,
  options?: Parameters<OthersType>[1],
) {
  const dialog = useDialog()
  const obj = {
    ...(options ?? {}),
    positiveButtonProps: {
      type: 'primary' as const, // dialog success 时按钮不要为 success
      ...(options?.positiveButtonProps ?? {}),
    },
  }
  return dialog[type]({
    autoFocus: false,
    closeOnEsc: false,
    content,
    maskClosable: false,
    negativeText: '取消',
    positiveText: '确认',
    showIcon: false,
    title: '提示',
    ...obj,
  })
}

Object.values(DialogTypes).forEach((type) => {
  ;(create as unknown as Others)[type] = (content, options) => {
    return useInject(type, content, {
      showIcon: true,
      ...(options ?? {}),
    })
  }
})
;(create as unknown as DestroyAll).destroyAll = () => {
  const dialog = useDialog()
  return dialog.destroyAll()
}
export default create as DestroyAll & Others & OthersType
