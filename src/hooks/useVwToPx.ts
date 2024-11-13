/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 23:18:24
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-26 23:30:23
 * @Description  :
 */
export default (VW: number | Ref<number>) => {
  const commonStore = useCommonStore(piniaInstance)
  const n = isRef(VW) ? VW.value : VW
  return computed(() => (n * commonStore.screenWidth) / 100)
}
