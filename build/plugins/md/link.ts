/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-02 09:52:56
 * @Description  :
 */
import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.link_open = (tokens, idx, options) => {
    const { tag } = tokens[idx]
    // @ts-expect-error vitepress 类型没有写的那么全
    const externalLinks = (options.externalLinks ?? {
      rel: 'noopener noreferrer',
      target: '_blank',
    }) as Record<string, string>
    Object.keys(externalLinks).forEach((key) => {
      tokens[idx].attrSet(key, externalLinks[key])
    })
    const attrsStr = md.renderer.renderAttrs(tokens[idx])
    return `<n-${tag} ${attrsStr}><n-gradient-text type="primary">`
  }
  md.renderer.rules.link_close = (tokens, idx) => {
    const { tag } = tokens[idx]
    return `</n-gradient-text></n-${tag}>`
  }
}
