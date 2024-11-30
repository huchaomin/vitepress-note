/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 23:02:12
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.link_open = (tokens, idx) => {
    const { tag } = tokens[idx]
    const attrsStr = md.renderer.renderAttrs(tokens[idx])
    return `<n-${tag} ${attrsStr}><n-gradient-text type="primary">`
  }
  md.renderer.rules.link_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-gradient-text></n-${tag}>`
  }
}
