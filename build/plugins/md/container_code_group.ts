/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-30 10:22:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-06 17:35:08
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

import { extractTitle } from '../../utils/index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules['container_code-group_open'] = (tokens, idx) => {
    const closeTokenIndex = tokens.findIndex((token, index) => {
      return index > idx && token.type === 'container_code-group_close'
    })
    const childTokens = tokens
      .slice(idx + 1, closeTokenIndex)
      .filter((t) => t.level === tokens[idx].level + 1)
    childTokens.forEach((t) => {
      const isHtml = t.type === 'html_block'
      const title = extractTitle(isHtml ? t.content : t.info, isHtml)
      t.attrSet('tabName', title)
    })
    return `<n-card
      :class="isMobile ? '-mx-3 !w-auto' : ''"
      class="code_group_card"
      embedded
      :bordered="false"
      content-class="!p-0"
    >
      <n-tabs type="line" animated>
    `
  }
  md.renderer.rules['container_code-group_close'] = () => {
    return `</n-tabs>
      </n-card>`
  }
}
