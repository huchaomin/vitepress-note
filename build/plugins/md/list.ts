/*
 * @Author       : peter
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter
 * @LastEditTime : 2024-12-04 09:42:19
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  ;['ordered_list_open', 'bullet_list_open'].forEach((rule) => {
    md.renderer.rules[rule] = (...arg) => {
      const [tokens, idx] = arg
      const token = tokens[idx]
      const { tag } = token
      return `<n-${tag}>`
    }
  })
  ;['ordered_list_close', 'bullet_list_close'].forEach((rule) => {
    md.renderer.rules[rule] = (...arg) => {
      const [tokens, idx] = arg
      const token = tokens[idx]
      const { tag } = token
      return `</n-${tag}>`
    }
  })
  md.renderer.rules.list_item_open = () => {
    return '<n-li>'
  }
  md.renderer.rules.list_item_close = () => {
    return '</n-li>'
  }
}
