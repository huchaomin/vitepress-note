/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-16 16:10:27
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 16:25:36
 * @Description  :
 */
import type { DialogOptions } from 'naive-ui'

export default (content: DialogOptions['content'], options?: Omit<DialogOptions, 'content'>) => {
  return new Promise<void>((resolve, reject) => {
    const config = options ?? {}
    const _onNegativeClick = config.onNegativeClick
    const _onPositiveClick = config.onPositiveClick
    $dialog({
      closable: false,
      content,
      ...(options ?? {}),
      onNegativeClick: (...arg) => {
        reject()
        return _onNegativeClick?.(...arg)
      },
      onPositiveClick: (...arg) => {
        resolve()
        return _onPositiveClick?.(...arg)
      },
    })
  })
}
