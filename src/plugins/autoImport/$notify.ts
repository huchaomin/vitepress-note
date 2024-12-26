/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-20 09:00:28
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-26 09:34:47
 * @Description  :
 */

import type { NotificationOptions, NotificationReactive } from 'naive-ui'

import { useNotify } from '@/plugins/naive-ui/discreteApi'
import { notificationPlacement, type PlacementType } from '@/plugins/naive-ui/providerProps'

// key 暂时没有用到 $notify.create option.type 就为 default
enum NotificationTypes {
  default = 'create',
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

interface CreateMethodsDestroyAll {
  destroyAll: () => void
}

type CreateMethodsOthers = {
  // 映射类型和函数类型不能写在一起
  [value in NotificationTypes]: NotificationProviderInjectionMethodsOthers
}

type NotificationContentOptions = NotificationOptions['content']

type NotificationProviderInjectionMethodsOthers = (
  content: NotificationContentOptions,
  options?: Omit<NotificationOptions, 'content' | 'type'> & {
    placement?: PlacementType
  },
) => NotificationReactive

type NotificationTypesValues = `${NotificationTypes}`

const create: NotificationProviderInjectionMethodsOthers = (...arg) => {
  return useInject('success', ...arg)
}

function useInject(
  type: NotificationTypesValues,
  content: Parameters<NotificationProviderInjectionMethodsOthers>[0],
  options?: Parameters<NotificationProviderInjectionMethodsOthers>[1],
) {
  const notification = useNotify()
  const obj = {
    ...(options ?? {}),
  }
  notificationPlacement.value = obj.placement ?? 'top-right'
  delete obj.placement
  return notification[type]({
    content,
    keepAliveOnHover: true,
    title: '提示',
    ...obj,
  })
}

Object.values(NotificationTypes).forEach((type) => {
  ;(create as unknown as CreateMethodsOthers)[type] = (...arg) => {
    return useInject(type, ...arg)
  }
})
;(create as unknown as CreateMethodsDestroyAll).destroyAll = () => {
  const notification = useNotify()
  return notification.destroyAll()
}
export default create as CreateMethodsDestroyAll &
  CreateMethodsOthers &
  NotificationProviderInjectionMethodsOthers
