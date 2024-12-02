/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-02 11:13:00
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.paragraph_open = () => {
    return `<n-p>`
  }
  md.renderer.rules.paragraph_close = () => {
    return `</n-p>`
  }
}
