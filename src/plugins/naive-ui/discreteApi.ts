/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 17:53:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-09 10:42:08
 * @Description  :
 */
import { createDiscreteApi } from 'naive-ui'
import configProviderProps from './configProviderProps'

type CreateDiscreteApiConfig = NonNullable<Parameters<typeof createDiscreteApi>[1]>

export type LoadingBarInstance = ReturnType<typeof useLoadingBar>

function useLoadingBar(
  loadingBarProviderProps?: CreateDiscreteApiConfig['loadingBarProviderProps'],
) {
  const { loadingBar } = createDiscreteApi(['loadingBar'], {
    configProviderProps,
    loadingBarProviderProps,
  })
  return loadingBar
}

export { useLoadingBar }
