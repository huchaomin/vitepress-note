/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-03 16:56:23
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-03 17:08:12
 * @Description  :
 */
import { designWidth } from '@/utils/config'

export default (PX: number | Ref<number>) => {
  const commonStore = useCommonStore()
  const n = isRef(PX) ? PX.value : PX
  return computed(() => (commonStore.screenWidth / designWidth) * n)
}
