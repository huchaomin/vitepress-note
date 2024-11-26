/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-26 15:44:52
 * @Description  :
 */
import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const result = defaultRender!(tokens, idx, options, env, self)
    const root = parse(result).clone() as unknown as HTMLElement
    root.querySelector('button.copy')?.remove()
    root.classList.remove('vp-adaptive-theme')
    return `<FenceWrapper content="${md.utils
      .escapeHtml(tokens[idx].content)
      .replace(/\/\/ \[!code .*\]/g, '')
      .trim()}">${root.outerHTML}</FenceWrapper>`
  }
}
