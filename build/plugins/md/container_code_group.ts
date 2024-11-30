/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-30 10:22:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-30 11:10:12
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  console.log(Object.keys(md.renderer.rules))
  md.renderer.rules['container_code-group_open'] = (tokens, idx) => {
    const closeTokenIndex = tokens.findIndex((token, index) => {
      return index > idx && token.type === 'container_code-group_close'
    })
    const fenceTokenArray = tokens.slice(idx + 1, closeTokenIndex)
    tokens.splice(idx, fenceTokenArray.length + 2)
    // console.log(tokens)
    const tabPaneString = fenceTokenArray.reduce((acc, token) => {
      return `${acc}<n-tab-pane name="${token.info}" tab="${token.info}">
      Wonderwall
    </n-tab-pane>`
    }, '')
    return `
      <n-card>
        <n-tabs type="line" animated>
          ${tabPaneString}
        </n-tabs>
      </n-card>
    `
  }
  // md.renderer.rules['container_code-group_close'] = () => {
  //   return `</n-collapse-item>
  //     </n-collapse></n-card>`
  // }
}
