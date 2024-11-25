/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 16:48:14
 * @Description  :
 */
import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const result = defaultRender!(tokens, idx, options, env, self)
    const root = parse(result).clone() as unknown as HTMLElement
    root.classList.remove('vp-adaptive-theme')
    return `<n-card embedded :bordered="false" content-style="padding: 0">
      <n-scrollbar x-scrollable>
        ${root.outerHTML}
      </n-scrollbar>
    </n-card>`
  }
}
