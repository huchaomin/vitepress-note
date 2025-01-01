/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-27 23:40:44
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-01 21:22:31
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

// https://vite-pwa-org.netlify.app/frameworks/#type-declarations
declare module 'virtual:pwa-register' {
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types'

  export type { RegisterSWOptions }
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}
