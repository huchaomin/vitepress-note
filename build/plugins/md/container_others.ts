/*
 * @Author       : peter
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter
 * @LastEditTime : 2024-11-30 10:23:59
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
}
