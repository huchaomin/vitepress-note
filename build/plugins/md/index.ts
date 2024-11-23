/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-23 10:51:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-23 11:05:18
 * @Description  :
 */
import heading from './heading.ts'
import type { defineConfig } from 'vitepress'

export type MarkdownIt = Parameters<
  NonNullable<NonNullable<ReturnType<typeof defineConfig>['markdown']>['config']>
>[0]

export default (md: MarkdownIt) => {
  md.use(heading)
}
