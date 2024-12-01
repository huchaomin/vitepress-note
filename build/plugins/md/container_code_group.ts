/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-30 10:22:15
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-01 23:32:08
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules['container_code-group_open'] = (tokens, idx) => {
    const closeTokenIndex = tokens.findIndex((token, index) => {
      return index > idx && token.type === 'container_code-group_close'
    })
    const fenceTokenArray = tokens
      .slice(idx + 1, closeTokenIndex)
      .filter((t) => t.level === tokens[idx].level + 1)
    fenceTokenArray.forEach((t) => {
      t.attrSet('tabName', t.info) // TODO 这里放什么以后就加什么 html_block
    })
    return `<n-card
      :class="isMobile ? '-mx-3 !w-auto' : ''"
      class="code_group_card"
      embedded
      :bordered="false"
      content-class="!p-0"
    >
      <n-tabs type="line" animated :tabs-padding="16">
    `
  }
  md.renderer.rules['container_code-group_close'] = () => {
    return `</n-tabs>
      </n-card>`
  }
}
