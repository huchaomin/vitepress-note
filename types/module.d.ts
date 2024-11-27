/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-27 23:40:44
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-28 00:06:48
 * @Description  :
 */
// https://segmentfault.com/q/1010000042015279
// https://juejin.cn/post/7008710181769084964
// https://juejin.cn/post/7229877486170439740
// https://github.com/vitejs/vite/discussions/9431
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
