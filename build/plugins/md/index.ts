/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:51:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 11:36:14
 * @Description  :
 */
import type { defineConfig } from 'vitepress'

import codeInline from './codeInline.ts'
import heading from './heading.ts'
import link from './link.ts'
import paragraph from './paragraph.ts'
import table from './table.ts'

export type MarkdownIt = Parameters<
  NonNullable<NonNullable<ReturnType<typeof defineConfig>['markdown']>['config']>
>[0]

export default (md: MarkdownIt) => {
  md.use(heading)
  md.use(paragraph)
  md.use(table)
  md.use(link)
  md.use(codeInline)
}
