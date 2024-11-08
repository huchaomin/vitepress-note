/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 09:30:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 15:23:50
 * @Description  : 添加 fetch 通用请求 配置
 */
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import type { Arg } from 'alova'

const NETWORK_ERR_MSG = '网络错误，请稍后再试'

interface MetaType {
  useDataResult: boolean
  useDownload: string
  useEmptyData: boolean
  useEmptyParams: boolean
  useFailMsg: boolean
  useFormData: boolean
  useLoading: boolean
  useResponseBlob: boolean
  useSuccessMsg: boolean
  useToken: boolean
}

type AddMethodMetaType = {
  meta: MetaType
} & Omit<Parameters<NonNullable<Parameters<typeof createAlova>[0]['beforeRequest']>>[0], 'meta'>

export default createAlova({
  baseURL:
    (import.meta.env.VITE_BASE_URL === '/' ? '' : import.meta.env.VITE_BASE_URL) +
    import.meta.env.VITE_API_PREFIX,
  // 请求前拦截器 可以为异步函数
  beforeRequest(m) {
    const method = m as unknown as AddMethodMetaType
    method.meta = {
      ...{
        useDataResult: true,
        useEmptyData: false,
        useEmptyParams: true,
        useFailMsg: true,
        useFormData: false,
        useLoading: true,
        useResponseBlob: false,
        useSuccessMsg: false,
        useToken: true,
      },
      ...(method.meta ?? {}),
    }
    const userStore = useUserStore()
    const { useEmptyData, useEmptyParams, useFormData, useLoading, useToken } = method.meta
    if (useToken) {
      if (userStore.token) {
        method.config.headers.Authorization = userStore.token
      } else {
        method.abort()
      }
    }
    if (useLoading) {
      $loading.show()
    }
    if (useEmptyParams) {
      const obj = method.config.params
      Object.keys(obj).forEach((key) => {
        // eslint-disable-next-line ts/no-unsafe-argument
        if (['', null, undefined].includes(obj[key])) {
          delete obj[key]
        }
      })
    }
    if (useEmptyData) {
      const obj = (method.data ?? {}) as Arg
      Object.keys(obj).forEach((key) => {
        // eslint-disable-next-line ts/no-unsafe-argument
        if (['', null, undefined].includes(obj[key])) {
          delete obj[key]
        }
      })
    }
    if (useFormData) {
      const obj = (method.data ?? {}) as Arg
      const formData = new FormData()
      Object.keys(obj).forEach((key) => {
        // eslint-disable-next-line ts/no-unsafe-argument
        formData.append(key, obj[key])
      })
      method.data = formData
    }
  },
  cacheFor: null, // 全局关闭全部请求缓存
  requestAdapter: adapterFetch(),
  // https://alova.js.org/zh-CN/tutorial/getting-started/basic/global-interceptor
  responded: {
    // 不论是成功、失败、还是命中缓存
    onComplete: (m) => {
      const method = m as unknown as AddMethodMetaType
      if (method.meta.useLoading) {
        $loading.hide() // TODO 这个loading 消失的时机准，transformData 可以为异步，异步结束之后才走这里，官方的流程图不准
      }
    },

    // TODO transformData 抛出的错误不会走这里
    // 这里必须抛出错误, 要不然await method 会 resolve undefined
    onError: async (err) => {
      console.log('err', err)
      if (err instanceof Error) {
        const { message } = err
        // 主动取消请求，不要报错
        if (message.toLowerCase().includes('abort')) {
          return Promise.reject(err)
        }
        if (message.toLowerCase().includes('timeout')) {
          $notify.error('请求超时')
          return Promise.reject(err)
        }
      }
      $notify.error(NETWORK_ERR_MSG)
      return Promise.reject(err)
    },

    /*  当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，
    即使响应的 HTTP 状态码是 404 或 500。
    相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），
    仅当网络故障时或请求被阻止时，才会标记为 reject */
    // TODO onSuccess 中抛出错误不会触发 onError（与hook级别不一样哦）
    // 当捕获错误但没有抛出错误或返回 reject 状态的 Promise 实例，将认为请求是成功的，且不会获得响应数据。
    // 代码直接报错那当然，请求是失败的
    onSuccess: async (response, m) => {
      const method = m as unknown as AddMethodMetaType
      const { headers, ok, status } = response
      if (ok === false) {
        const map: Record<number, string> = {
          403: '当前操作没有权限',
          404: '访问资源不存在',
        }
        const m = map[status] ?? NETWORK_ERR_MSG
        $notify.error(m)
        return Promise.reject(response)
      }
      const { useDataResult, useFailMsg, useResponseBlob, useSuccessMsg } = method.meta
      // 有时候后端没有返回文件流，而是返回了json数据，这里可能是因为后端返回了错误信息，所以要加上后面的判断
      if (useResponseBlob && !headers.get('content-type')?.includes('application/json')) {
        const { useDownload } = method.meta
        if (useDownload) {
          // TODO
          // saveAs(new Blob([resData]), useDownload)
        }
        return response
      }
      // eslint-disable-next-line ts/no-unsafe-assignment
      const resData = await response.json()
      // eslint-disable-next-line ts/no-unsafe-member-access
      if (resData?.code !== undefined) {
        const { code, msg } = resData as {
          code: number
          msg: string
        }
        if (code >= 400) {
          if (code === 401) {
            useUserStore().clearSession()
          } else {
            if (useFailMsg) {
              $notify.error(msg)
            }
          }
          return Promise.reject(resData)
        } else {
          if (useSuccessMsg) {
            $notify(msg)
          }
          // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-member-access
          return useDataResult ? (resData.data ?? resData) : resData
        }
      }
      console.log('response', response)
      return response
    },
  },
  shareRequest: true, // 全局开启请求共享,相同请求结果会沿用上一次未完成请求的结果
  statesHook: VueHook,
  timeout: 15000,
})
