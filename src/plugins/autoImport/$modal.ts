/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-11 09:24:19
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-03 17:45:03
 * @Description  :
 */
import type { ModalApi } from 'naive-ui'

import { useModal } from '@/plugins/naive-ui/discreteApi'

type ModalApiCreate = ModalApi['create']

interface ModalApiDestroyAll {
  destroyAll: () => void
}

const create: ModalApiCreate = (config) => {
  return useModal().create({
    autoFocus: false,
    closeOnEsc: false,
    maskClosable: false,
    negativeText: '取消',
    positiveText: '确认',
    preset: 'dialog',
    showIcon: false,
    title: '提示',
    ...(config ?? {}),
  })
}

;(create as unknown as ModalApiDestroyAll).destroyAll = () => {
  return useModal().destroyAll()
}

export default create as ModalApiCreate & ModalApiDestroyAll
