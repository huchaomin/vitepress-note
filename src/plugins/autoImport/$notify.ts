/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-15 18:28:27
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 09:19:07
 * @Description  :
 */

import type { NotificationApi, NotificationOptions, NotificationReactive } from 'naive-ui'

import { useNotify } from '@/plugins/naive-ui/discreteApi'
import { notificationPlacement, type PlacementType } from '@/plugins/naive-ui/providerProps'

enum NotificationCreateType {
  create = 'create',
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

interface CreateNotificationDestroyAllType {
  destroyAll: NotificationApi['destroyAll']
}

type CreateNotificationFnType = (
  content: NotificationOptions['content'],
  options?: OptionsType,
) => NotificationReactive

type CreateNotificationMappedType = {
  [value in NotificationCreateType]: CreateNotificationFnType
}

/**
 * @description: 不需要 type content 字段
 */
type OptionsType = Omit<NotificationOptions, 'content' | 'type'> & {
  placement?: PlacementType
}

class NotificationService {
  private readonly notification: NotificationApi

  constructor() {
    this.notification = useNotify()
  }

  create(
    type: `${NotificationCreateType}`,
    content: Parameters<CreateNotificationFnType>[0],
    options: Parameters<CreateNotificationFnType>[1],
  ) {
    const obj = {
      ...(options ?? {}),
    }
    notificationPlacement.value = obj.placement ?? 'top-right'
    delete obj.placement
    return this.notification[type]({
      content,
      duration: 3000,
      keepAliveOnHover: true,
      title: '提示',
      ...obj,
    })
  }

  destroyAll() {
    return this.notification.destroyAll()
  }
}

const notificationService = new NotificationService()

type CreateNotificationType = CreateNotificationDestroyAllType &
  CreateNotificationFnType &
  CreateNotificationMappedType

function useNotifyCreate(
  type: `${NotificationCreateType}`,
  ...arg: Parameters<CreateNotificationFnType>
) {
  return notificationService.create(type, ...arg)
}

const createNotification: CreateNotificationType = function (...arg) {
  return useNotifyCreate('success', ...arg)
} as CreateNotificationType

Object.values(NotificationCreateType).forEach((type) => {
  createNotification[type] = (...arg) => {
    return useNotifyCreate(type, ...arg)
  }
})
createNotification.destroyAll = () => {
  return notificationService.destroyAll()
}

export default createNotification
