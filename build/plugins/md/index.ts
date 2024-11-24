/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:51:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-25 00:03:07
 * @Description  :
 */
import type { defineConfig } from 'vitepress'

import heading from './heading.ts'
import paragraph from './paragraph.ts'

export type MarkdownIt = Parameters<
  NonNullable<NonNullable<ReturnType<typeof defineConfig>['markdown']>['config']>
>[0]

export default (md: MarkdownIt) => {
  md.use(heading)
  md.use(paragraph)
}
