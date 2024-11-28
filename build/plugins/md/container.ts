/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-28 17:48:32
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

const typeArr = [
  {
    alertType: 'success',
    type: 'tip',
  },
  {
    alertType: 'info',
    type: 'info',
  },
  {
    alertType: 'warning',
    type: 'warning',
  },
  {
    alertType: 'error',
    type: 'danger',
  },
]

export default (md: MarkdownIt) => {
  typeArr.forEach((obj) => {
    md.renderer.rules[`container_${obj.type}_open`] = (tokens, idx, options) => {
      const { info } = tokens[idx]
      // eslint-disable-next-line ts/no-unsafe-assignment
      const title =
        // @ts-expect-error 类型错误
        // eslint-disable-next-line ts/no-unsafe-member-access
        info.trim().slice(obj.type.length).trim() || options.container[`${obj.type}Label`]
      return `<n-alert :bordered="false" title="${title}" type="${obj.alertType}">`
    }
    md.renderer.rules[`container_${obj.type}_close`] = () => {
      return `</n-alert>`
    }
  })
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
