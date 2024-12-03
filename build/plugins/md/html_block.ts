/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-03 14:03:29
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.html_block
  md.renderer.rules.html_block = (...arg) => {
    const [tokens, idx] = arg
    const token = tokens[idx]
    const tabName = token.attrGet('tabName')
    token.attrSet('tabName', '')
    let prev = ''
    let post = ''
    if (tabName) {
      prev = `<n-tab-pane name="${tabName}" tab="${tabName}">`
      post = '</n-tab-pane>'
    }
    return `${prev}${defaultRender!(...arg)}${post}`
  }
}
