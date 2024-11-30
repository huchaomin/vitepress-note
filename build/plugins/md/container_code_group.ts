/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-30 10:22:15
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-01 00:24:04
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules['container_code-group_open'] = (tokens, idx) => {
    const closeTokenIndex = tokens.findIndex((token, index) => {
      return index > idx && token.type === 'container_code-group_close'
    })
    const fenceTokenArray = tokens.slice(idx + 1, closeTokenIndex)
    fenceTokenArray.forEach((t) => {
      t.attrSet('tabName', t.info) // TODO 这里放什么以后就加什么
    })
    return `<n-card>
      <n-tabs type="segment" animated>
    `
  }
  md.renderer.rules['container_code-group_close'] = () => {
    return `</n-tabs>
      </n-card>`
  }
}
