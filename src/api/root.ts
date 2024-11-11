/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 16:49:39
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 17:30:27
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
