/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 11:48:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-15 14:04:20
 * @Description  :
 */

export default () => {
  const waiting = document.querySelector('#waiting') as HTMLElement
  waiting.addEventListener('animationend', () => {
    waiting.remove()
  })
  waiting.style.opacity = '0'
}
