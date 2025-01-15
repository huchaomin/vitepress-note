/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-04 11:31:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-15 15:34:13
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
      positiveButtonProps: {
        type: 'primary' as const, // dialog success 时按钮不要为 success
        ...(options.positiveButtonProps ?? {}),
      },
    }
    return this.dialog.create({
      autoFocus: false,
      closeOnEsc: false,
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
