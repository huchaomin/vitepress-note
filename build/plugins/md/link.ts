/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 11:04:39
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.link_open = (tokens, idx) => {
    const { attrs, tag } = tokens[idx]
    const attrsStr =
      attrs === null
        ? ''
        : attrs.reduce((acc, [name, value]) => {
            return `${acc} ${name}="${value}"`
          }, '')
    return `<n-${tag} ${attrsStr}><n-gradient-text type="primary">`
  }
  md.renderer.rules.link_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-gradient-text></n-${tag}>`
  }
}
