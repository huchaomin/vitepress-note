/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码
   */
  readonly VITE_BASE_URL: string
  readonly VITE_PORT: number
  readonly VITE_API_PREFIX: string
}
