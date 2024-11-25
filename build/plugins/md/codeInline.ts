/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 14:27:45
 * @Description  :
 */
import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const result = defaultRender!(tokens, idx, options, env, self)
    const root = parse(result)
    return `
      <n-text code>
        ${root.innerHTML}
      </n-text>`
  }
}
