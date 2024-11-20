/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 11:48:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-19 17:50:52
 * @Description  :
 */
import { inBrowser } from 'vitepress'

if (inBrowser && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const waiting = document.querySelector('#waiting') as HTMLElement
    // transitionend 有时候不触发 https://cloud.tencent.com/developer/ask/sof/170326
    // waiting.addEventListener('transitionend', () => {
    //   waiting.remove()
    // })
    waiting.style.opacity = '0'
    setTimeout(() => {
      waiting.remove()
    }, 1000)
  })
}
