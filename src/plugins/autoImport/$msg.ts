/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-15 15:42:28
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-15 17:35:46
 * @Description  :
 */

import type { MessageApi, MessageOptions, MessageReactive } from 'naive-ui'
import type { VNodeChild } from 'vue'

import { useMessage } from '@/plugins/naive-ui/discreteApi'
import { messagePlacement, type PlacementType } from '@/plugins/naive-ui/providerProps'

enum MessageCreateType {
  create = 'create',
  error = 'error',
  info = 'info',
  loading = 'loading',
  success = 'success',
  warning = 'warning',
}

interface CreateMessageDestroyAllType {
  destroyAll: MessageApi['destroyAll']
}

type CreateMessageFnType = (
  content: (() => VNodeChild) | string,
  options?: OptionsType,
) => MessageReactive

type CreateMessageMappedType = {
  [value in MessageCreateType]: CreateMessageFnType
}

/**
 * @description: 不需要 type 字段
 */
type OptionsType = Omit<MessageOptions, 'type'> & {
  placement?: PlacementType
}

class MessageService {
  private readonly message: MessageApi

  constructor() {
    this.message = useMessage()
  }

  create(
    type: `${MessageCreateType}`,
    content: Parameters<CreateMessageFnType>[0],
    options: Parameters<CreateMessageFnType>[1],
  ) {
    const obj = {
      ...(options ?? {}),
    }
    messagePlacement.value = obj.placement ?? 'top'
    delete obj.placement
    return this.message[type](content, {
      keepAliveOnHover: true,
      ...obj,
    })
  }

  destroyAll() {
    return this.message.destroyAll()
  }
}

const messageService = new MessageService()

function useMessageCreate(type: `${MessageCreateType}`, ...arg: Parameters<CreateMessageFnType>) {
  return messageService.create(type, ...arg)
}

const createMessage: CreateMessageFnType = function (...arg) {
  return useMessageCreate('success', ...arg)
}

Object.values(MessageCreateType).forEach((type) => {
  ;(createMessage as unknown as CreateMessageMappedType)[type] = (...arg) => {
    return useMessageCreate(type, ...arg)
  }
})
;(createMessage as unknown as CreateMessageDestroyAllType).destroyAll = () => {
  return messageService.destroyAll()
}

export default createMessage as CreateMessageDestroyAllType &
  CreateMessageFnType &
  CreateMessageMappedType
