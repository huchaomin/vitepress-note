/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 23:01:40
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.heading_open = (tokens, idx) => {
    const { tag } = tokens[idx]
    const attrsStr = md.renderer.renderAttrs(tokens[idx])
    return `<n-${tag} ${attrsStr}><n-text>`
  }
  md.renderer.rules.heading_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-text></n-${tag}>`
  }
}
