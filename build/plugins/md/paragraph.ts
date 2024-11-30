/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 22:32:54
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.paragraph_open = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `<n-${tag}>`
  }
  md.renderer.rules.paragraph_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-${tag}>`
  }
}
