/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-30 10:22:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-30 10:22:55
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  console.log(Object.keys(md.renderer.rules))
  md.renderer.rules.container_details_open = (tokens, idx, options) => {
    const { info } = tokens[idx]
    // eslint-disable-next-line ts/no-unsafe-assignment
    const title =
      // @ts-expect-error 类型错误
      // eslint-disable-next-line ts/no-unsafe-member-access
      info.trim().slice('details'.length).trim() || options.container.detailsLabel
    return `<n-card
      class="details_container_card"
      embedded
      :bordered="false"
      content-style="padding: 13px"
    >
        <n-collapse>
          <n-collapse-item title="${title}" name="1">`
  }
  md.renderer.rules.container_details_close = () => {
    return `</n-collapse-item>
      </n-collapse></n-card>`
  }
}
