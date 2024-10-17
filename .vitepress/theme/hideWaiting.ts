/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 11:48:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-17 21:15:43
 * @Description  :
 */
import { inBrowser } from 'vitepress'

if (inBrowser && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const waiting = document.querySelector('#waiting') as HTMLElement
    waiting.addEventListener('transitionend', () => {
      waiting.remove()
    })
    waiting.style.opacity = '0'
  })
}
