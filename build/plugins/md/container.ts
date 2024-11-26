/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-26 17:54:27
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

const typeArr = [
  {
    alertType: 'success',
    showIcon: true,
    type: 'tip',
  },
  {
    alertType: 'info',
    showIcon: true,
    type: 'info',
  },
  {
    alertType: 'warning',
    showIcon: true,
    type: 'warning',
  },
  {
    alertType: 'error',
    showIcon: true,
    type: 'danger',
  },
  {
    alertType: 'default',
    showIcon: false,
    type: 'details',
  },
]

export default (md: MarkdownIt) => {
  typeArr.forEach((obj) => {
    md.renderer.rules[`container_${obj.type}_open`] = (tokens, idx, options) => {
      const { attrs, info } = tokens[idx]
      // eslint-disable-next-line ts/no-unsafe-assignment
      const title =
        // @ts-expect-error 类型错误
        // eslint-disable-next-line ts/no-unsafe-member-access
        info.trim().slice(obj.type.length).trim() || options.container[`${obj.type}Label`]
      const attrsStr =
        attrs === null
          ? ''
          : attrs.reduce((acc, [name, value]) => {
              return `${acc} ${name}="${value}"`
            }, '')
      return `<n-alert :bordered="false" title="${title}" :show-icon="${obj.showIcon}" type="${obj.alertType}" ${attrsStr}>`
    }
    md.renderer.rules[`container_${obj.type}_close`] = () => {
      return `</n-alert>`
    }
  })
}
