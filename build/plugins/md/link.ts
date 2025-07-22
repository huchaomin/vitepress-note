/*
 * @Author       : peter
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter
 * @LastEditTime : 2024-12-02 10:58:17
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.link_open
  md.renderer.rules.link_open = (...arg) => {
    // 这里直接修改 token 的 type 不生效
    return `${defaultRender!(...arg).replace('<a', '<n-a')}<n-gradient-text type="primary">`
  }
  md.renderer.rules.link_close = () => {
    return `</n-gradient-text></n-a>`
  }
}
