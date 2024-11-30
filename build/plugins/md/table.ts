/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 22:33:47
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.table_open = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `<n-${tag} striped :single-line="false">`
  }
  md.renderer.rules.table_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-${tag}>`
  }
}
