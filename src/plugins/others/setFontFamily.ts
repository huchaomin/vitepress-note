/*
 * @Author       : peter
 * @Date         : 2024-11-28 13:59:03
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-28 23:44:58
 * @Description  :
 */
import { inBrowser } from 'vitepress'

if (inBrowser) {
  const docStyle = document.documentElement.style

  if (import.meta.env.PROD || import.meta.env.VITE_SHOW_RIGHT_FONT) {
    void import('@/assets/fonts/milky-mono-cn-regular.ttf').then(({ css }) => {
      docStyle.setProperty('--default-mono-font-family', css.family)
      docStyle.setProperty('--default-font-family', css.family)
    })
  } else {
    const fontFamilyFallback =
      '"PingFangSC-Semibold fallback default fa8e7e","PingFangSC-Regular fallback default fa8e7e","Microsoft YaHei fallback default fa8e7e","Source Han Sans fallback default fa8e7e"'
    docStyle.setProperty('--default-mono-font-family', fontFamilyFallback)
    docStyle.setProperty('--default-font-family', fontFamilyFallback)
  }
}
