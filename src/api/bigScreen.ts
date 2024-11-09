/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:24:32
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 17:40:53
 * @Description  :
 */
import alova from '@/plugins/alova'

const PREFIX = 'qczt/bigScreen'

export function getMainData() {
  return alova.Get(`${PREFIX}/getMainData`)
}
