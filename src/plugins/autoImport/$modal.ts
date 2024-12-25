/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-11 09:24:19
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-25 10:33:33
 * @Description  :
 */
import type { ModalOptions } from 'naive-ui'

import { useModal } from '@/plugins/naive-ui/discreteApi'

export default (config: ModalOptions) => {
  return useModal().create({
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
