/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-03 16:56:23
 * @LastEditors  : peter
 * @LastEditTime : 2024-11-13 17:47:37
 * @Description  :
 */
import { designScreenWidth } from '@/utils/config'

export default (PX: number | Ref<number>) => {
  const commonStore = useCommonStore(piniaInstance)
  const n = isRef(PX) ? PX.value : PX
  return computed(() => (commonStore.screenWidth / designScreenWidth) * n)
}
