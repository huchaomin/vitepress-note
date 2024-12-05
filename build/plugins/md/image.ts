/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:49:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-05 10:59:32
 * @Description  :
 */
import path from 'node:path'
import { normalizePath } from 'vite'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  md.renderer.rules.image = (...arg) => {
    const src = arg[0][arg[1]].attrGet('src')!
    let str = ''
    if (src.startsWith('img/')) {
      str = src
    } else {
      // eslint-disable-next-line ts/no-unsafe-member-access
      const relativePath = arg[3].relativePath as string
      str = normalizePath(path.join(path.dirname(relativePath), src))
    }
    return `<ImgWrapper src=${str}></ImgWrapper>`
  }
}
