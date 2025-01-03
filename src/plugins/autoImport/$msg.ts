/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-25 10:40:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-03 23:02:57
 * @Description  :
 */
import type { MessageApi, MessageOptions, MessageReactive } from 'naive-ui'
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

interface DestroyAll {
  destroyAll: MessageApi['destroyAll']
}

type MessageTypesValues = `${MessageTypes}`

type Others = {
  // 映射类型和函数类型不能写在一起
  [value in MessageTypes]: OthersType
}

type OthersType = (
  content: (() => VNodeChild) | string,
  options?: Omit<MessageOptions, 'type'> & {
    placement?: PlacementType
  },
) => MessageReactive

function useInject(
  type: MessageTypesValues,
  content: Parameters<OthersType>[0],
  options: Parameters<OthersType>[1],
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

const create: OthersType = (...arg) => {
  return useInject('success', ...arg)
}

Object.values(MessageTypes).forEach((type) => {
  ;(create as unknown as Others)[type] = (...arg) => {
    return useInject(type, ...arg)
  }
})
;(create as unknown as DestroyAll).destroyAll = () => {
  const message = useMessage()
  return message.destroyAll()
}
export default create as DestroyAll & Others & OthersType
