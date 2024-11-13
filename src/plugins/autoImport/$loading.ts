/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-11-05 11:29:13
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 14:15:35
 * @Description  :
 */
export default {
  hide() {
    const commonStore = useCommonStore(piniaInstance)
    setTimeout(() => {
      commonStore.loadingCount -= 1
    }, 300)
  },
  show() {
    const commonStore = useCommonStore(piniaInstance)
    commonStore.loadingCount += 1
  },
}
