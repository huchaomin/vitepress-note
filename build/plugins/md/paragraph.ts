/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-25 00:05:18
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.paragraph_open = (tokens, idx) => {
    const { attrs, tag } = tokens[idx]
    const attrsStr =
      attrs === null
        ? ''
        : attrs.reduce((acc, [name, value]) => {
            return `${acc} ${name}="${value}"`
          }, '')
    return `<n-${tag} ${attrsStr}>`
  }
  md.renderer.rules.paragraph_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-${tag}>`
  }
}
