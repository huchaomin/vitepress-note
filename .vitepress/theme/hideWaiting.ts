/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 11:48:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 09:32:23
 * @Description  :
 */
import { inBrowser } from 'vitepress'

if (inBrowser && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const waiting = document.querySelector('#waiting') as HTMLElement
    waiting.addEventListener('animationend', () => {
      waiting.remove()
    })
    waiting.style.opacity = '0'
  })
}
