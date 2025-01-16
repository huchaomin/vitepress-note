/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-04 11:31:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 10:11:17
 * @Description  :
 */

import type { DialogApi, DialogOptions } from 'naive-ui'

import { useDialog } from '@/plugins/naive-ui/discreteApi'

class DialogService {
  private readonly dialog: DialogApi

  constructor() {
    this.dialog = useDialog()
  }

  create(options: DialogOptions) {
    const obj = {
      ...options,
      negativeButtonProps: {
        size: 'medium' as const,
        ...(options.negativeButtonProps ?? {}),
      },
      positiveButtonProps: {
        size: 'medium' as const,
        type: 'primary' as const, // dialog success 时按钮不要为 success
        ...(options.positiveButtonProps ?? {}),
      },
    }
    return this.dialog.create({
      autoFocus: false,
      closeOnEsc: false,
      draggable: true,
      maskClosable: false,
      negativeText: '取消',
      positiveText: '确认',
      showIcon: options.type !== undefined,
      title: '提示',
      ...obj,
    })
  }

  destroyAll() {
    return this.dialog.destroyAll()
  }
}

const dialogService = new DialogService()

function createDialog(options: DialogOptions) {
  return dialogService.create(options)
}

createDialog.destroyAll = () => {
  return dialogService.destroyAll()
}

export default createDialog
