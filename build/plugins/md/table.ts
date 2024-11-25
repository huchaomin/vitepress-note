/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 09:58:05
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.table_open = (tokens, idx) => {
    const { attrs, tag } = tokens[idx]
    const attrsStr =
      attrs === null
        ? ''
        : attrs.reduce((acc, [name, value]) => {
            return `${acc} ${name}="${value}"`
          }, '')
    return `<n-${tag} ${attrsStr} striped :single-line="false">`
  }
  md.renderer.rules.table_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-${tag}>`
  }
}
