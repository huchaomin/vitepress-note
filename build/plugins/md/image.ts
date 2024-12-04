/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-04 14:30:01
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.image = (...arg) => {
    return `<n-image lazy ${md.renderer.renderAttrs(arg[0][arg[1]])}></n-image>`
  }
}
