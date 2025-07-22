/*
 * @Author       : peter
 * @Date         : 2024-11-11 09:24:19
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 10:31:08
 * @Description  :
 */
import type { ModalApi, ModalOptions } from 'naive-ui'

import { useModal } from '@/plugins/naive-ui/discreteApi'

class ModalService {
  private readonly modal: ModalApi

  constructor() {
    this.modal = useModal()
  }

  create(options: ModalOptions) {
    return this.modal.create({
      autoFocus: false,
      closeOnEsc: false,
      draggable: true,
      maskClosable: false,
      preset: 'card',
      style: {
        width: '400px',
      },
      title: '提示',
      ...options,
    })
  }

  destroyAll() {
    return this.modal.destroyAll()
  }
}

const modalService = new ModalService()

function createModal(options: ModalOptions) {
  return modalService.create(options)
}

createModal.destroyAll = () => {
  return modalService.destroyAll()
}

export default createModal
