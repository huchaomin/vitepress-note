/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-11 09:24:19
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 11:41:04
 * @Description  :
 */
import { useModal } from '@/plugins/naive-ui/discreteApi'
import type { ModalOptions } from 'naive-ui'

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
