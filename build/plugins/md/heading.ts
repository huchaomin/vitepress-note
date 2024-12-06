/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-06 13:56:51
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.heading_open
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const str = defaultRender
      ? defaultRender(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
    return str.replace('<h', '<n-h').replace('>', '><n-text>')
  }
  md.renderer.rules.heading_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-text></n-${tag}>`
  }
}
