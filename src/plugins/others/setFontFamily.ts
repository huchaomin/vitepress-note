/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-28 13:59:03
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-28 14:01:33
 * @Description  :
 */
import { css } from '@/assets/fonts/milky-mono-cn-regular.ttf'
import { inBrowser } from 'vitepress'

if (inBrowser) {
  const docStyle = document.documentElement.style

  docStyle.setProperty('--default-mono-font-family', css.family)
  docStyle.setProperty('--default-font-family', css.family)
}
