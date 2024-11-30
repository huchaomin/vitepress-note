/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-30 23:49:15
 * @Description  :
 */
import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = (...arg) => {
    const result = defaultRender!(...arg)
    const root = parse(result)
    return `
      <n-text code>
        ${root.innerHTML}
      </n-text>`
  }
}
