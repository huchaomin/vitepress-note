/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-20 09:00:28
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-25 10:41:11
 * @Description  :
 */

import type { NotificationOptions } from 'naive-ui'

import { useNotify } from '@/plugins/naive-ui/discreteApi'

enum NotificationTypes {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

type createFn = (content: string, options?: createFnOptions) => void

type createFnOptions = Omit<NotificationOptions, 'content' | 'type'> & {
  type?: keyof typeof NotificationTypes
}

type createMap = {
  // 映射类型和函数类型不能写在一起
  [key in NotificationTypes]: createFn
}

const create: createFn = (
  content,
  {
    duration = 2000,
    keepAliveOnHover = true,
    title = '提示',
    type = NotificationTypes.success,
    ...options
  } = {},
) => {
  const notification = useNotify()
  notification[type]({
    content,
    duration,
    keepAliveOnHover,
    title,
    ...options,
  })
}

Object.values(NotificationTypes).forEach((type) => {
  ;(create as unknown as createMap)[type] = (content, options = {}) => {
    create(content, {
      type,
      ...options,
    })
  }
})
export default create as createFn & createMap
