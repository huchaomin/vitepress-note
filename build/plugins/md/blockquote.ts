/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 22:28:45
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.blockquote_open = () => {
    return `<n-blockquote>`
  }
  md.renderer.rules.blockquote_close = () => {
    return '</n-blockquote>'
  }
}
