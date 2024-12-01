/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-01 23:35:01
 * @Description  :
 */
import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (...arg) => {
    const result = defaultRender!(...arg)
    const root = parse(result).clone() as unknown as HTMLElement
    root.querySelector('button.copy')?.remove()
    root.classList.remove('vp-adaptive-theme')
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
    return `${prev}<FenceWrapper :inCodeGroup=${!!tabName} content="${md.utils
      .escapeHtml(tokens[idx].content)
      .replace(/\/\/ \[!code .*\]/g, '')
      .trim()}">${root.outerHTML}</FenceWrapper>${post}`
  }
}
