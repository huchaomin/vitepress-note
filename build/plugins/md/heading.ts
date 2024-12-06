/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-06 23:54:43
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const defaultRender = md.renderer.rules.heading_open
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const str = defaultRender
      ? defaultRender(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
    const { tag } = tokens[idx]
    const divider = `<n-divider
      style="margin-bottom: 0 !important;"
      :class="isMobile ? '-mx-3' : '-ml-8 -mr-3'"
      :style="{
        width: isMobile ? 'calc(100% + var(--spacing-6))' : 'calc(100% + var(--spacing-12))',
      }"
    >
    </n-divider>`
    return str.replace('>', '><n-text>').replace('<h', `${tag === 'h2' ? divider : ''}<n-h`)
  }
  md.renderer.rules.heading_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-text></n-${tag}>`
  }
}
