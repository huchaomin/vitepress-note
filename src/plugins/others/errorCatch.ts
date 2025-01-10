/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-23 09:59:50
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-10 13:50:06
 * @Description  :
 */

export default (win: typeof globalThis & Window) => {
  const notifyConfig = {
    closable: true,
    duration: 0,
  }
  const errorWeakSet = new WeakSet<Error>()

  function handleError(e: Error, prefix: string) {
    if (!errorWeakSet.has(e)) {
      errorWeakSet.add(e)
      $notify.error(`${prefix}, 捕获到异常：${e.message}`, notifyConfig)
    }
  }

  /**
   * description: 可以捕获在脚本执行过程中发生的运行时错误，例如语法错误、引用错误等。
   */
  win.onerror = function (...arg) {
    const e = arg[4]
    if (e === undefined) {
      $notify.error(`window.onerror 捕获到异常：${JSON.stringify(arg)}`, notifyConfig)
    } else {
      handleError(e, 'window.onerror')
    }
    // 只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx
    return true
  }

  win.addEventListener(
    'error',
    function (event) {
      // eslint-disable-next-line ts/no-unsafe-assignment
      const e = event.error
      if (e instanceof Error) {
        handleError(e, 'window.addEventListener error')
      } else if (
        event.target instanceof HTMLScriptElement ||
        event.target instanceof HTMLLinkElement ||
        event.target instanceof HTMLImageElement ||
        event.target instanceof HTMLAudioElement ||
        event.target instanceof HTMLVideoElement ||
        event.target instanceof HTMLTrackElement
      ) {
        $notify.error(
          `${event.target.tagName}标签资源加载错误: ${
            (
              event.target as
                | HTMLAudioElement
                | HTMLImageElement
                | HTMLScriptElement
                | HTMLTrackElement
                | HTMLVideoElement
            ).src ?? (event.target as HTMLLinkElement).href
          }`,
          notifyConfig,
        )
      } else {
        $notify.error(`window.addEventListener 捕获到异常：${JSON.stringify(event)}`, notifyConfig)
      }
    },
    true, // 捕获阶段触发
  )

  win.addEventListener(
    'unhandledrejection',
    function (event) {
      event.preventDefault() // 去掉控制台的显示异常
      if (event.reason instanceof Error) {
        handleError(event.reason, 'unhandledrejection')
      } else {
        $notify.error(`unhandledrejection 捕获到异常：${JSON.stringify(event)}`, notifyConfig)
      }
    },
    true,
  )
}
