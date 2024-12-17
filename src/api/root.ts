/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 16:49:39
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-17 16:58:56
 * @Description  :
 */
import type { Arg } from 'alova'

import alova from '@/plugins/alova'

export async function login(params: Arg) {
  return alova.Post<{
    token: string
  }>('login', params, {
    meta: {
      useToken: false,
    },
  })
}
