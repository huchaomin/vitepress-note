/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 11:48:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-15 20:28:01
 * @Description  :
 */

if (!import.meta.env.SSR && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const waiting = document.querySelector('#waiting') as HTMLElement
    waiting.addEventListener('animationend', () => {
      waiting.remove()
    })
    waiting.style.opacity = '0'
  })
}
