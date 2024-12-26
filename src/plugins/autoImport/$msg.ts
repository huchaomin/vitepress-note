/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-25 10:40:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-26 09:34:42
 * @Description  :
 */
import type { MessageOptions, MessageReactive } from 'naive-ui'
import type { VNodeChild } from 'vue'

import { useMessage } from '@/plugins/naive-ui/discreteApi'
import { messagePlacement, type PlacementType } from '@/plugins/naive-ui/providerProps'

// key 暂时没有用到 $msg.create option.type 就为 default
enum MessageTypes {
  default = 'create',
  error = 'error',
  info = 'info',
  loading = 'loading',
  success = 'success',
  warning = 'warning',
}

interface CreateMethodsDestroyAll {
  destroyAll: () => void
}

type CreateMethodsOthers = {
  // 映射类型和函数类型不能写在一起
  [value in MessageTypes]: MessageProviderInjectionMethodsOthers
}

type MessageProviderInjectionMethodsOthers = (
  content: (() => VNodeChild) | string,
  options?: Omit<MessageOptions, 'type'> & {
    placement?: PlacementType
  },
) => MessageReactive

type MessageTypesValues = `${MessageTypes}`

function useInject(
  type: MessageTypesValues,
  content: Parameters<MessageProviderInjectionMethodsOthers>[0],
  options: Parameters<MessageProviderInjectionMethodsOthers>[1],
) {
  const message = useMessage()
  const obj = {
    ...(options ?? {}),
  }
  messagePlacement.value = obj.placement ?? 'top'
  delete obj.placement
  return message[type](content, {
    keepAliveOnHover: true,
    ...obj,
  })
}

const create: MessageProviderInjectionMethodsOthers = (...arg) => {
  return useInject('success', ...arg)
}

Object.values(MessageTypes).forEach((type) => {
  ;(create as unknown as CreateMethodsOthers)[type] = (...arg) => {
    return useInject(type, ...arg)
  }
})
;(create as unknown as CreateMethodsDestroyAll).destroyAll = () => {
  const message = useMessage()
  return message.destroyAll()
}
export default create as CreateMethodsDestroyAll &
  CreateMethodsOthers &
  MessageProviderInjectionMethodsOthers
