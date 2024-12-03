/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:51:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-03 13:52:56
 * @Description  :
 */
import type { defineConfig } from 'vitepress'

import blockquote from './blockquote.ts'
import codeInline from './codeInline.ts'
import containerCodeGroup from './container_code_group.ts'
import containerDetail from './container_detail.ts'
import containerOthers from './container_others.ts'
import fence from './fence.ts'
import heading from './heading.ts'
import htmlBlock from './html_block.ts'
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
  md.use(fence)
  md.use(blockquote)
  md.use(containerDetail)
  md.use(containerOthers)
  md.use(containerCodeGroup)
  md.use(htmlBlock)
}
