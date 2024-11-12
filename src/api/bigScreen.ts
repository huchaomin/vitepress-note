/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:24:32
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-12 11:27:29
 * @Description  :
 */
import type { Arg } from 'alova'
import alova from '@/plugins/alova'

const PREFIX = 'qczt/bigScreen'

export function getMainData() {
  return alova.Get(`${PREFIX}/getMainData`)
}

export function getRepayList(params: Arg) {
  return alova.Get(`${PREFIX}/getRepayList`, {
    params,
  })
}
