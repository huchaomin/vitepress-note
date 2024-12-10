/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-19 23:43:41
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-10 10:51:35
 * @Description  : index.md 的文件可以做入口文件
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import matter from 'gray-matter'
import fs from 'node:fs'
import path from 'node:path'
import { generateSidebar, type SidebarItem } from 'vitepress-sidebar'

import { mdPageDir, resolveCwd } from '../utils/index.ts'

dayjs.extend(utc)

function padStringToLength(str: string, length: number): string {
  return str.padEnd(length, ' ')
}

// https://vitepress-sidebar.cdget.com/zhHans/guide/api#excludepattern

const sidebar = (
  generateSidebar({
    debugPrint: false,
    documentRootPath: mdPageDir,
    excludeFilesByFrontmatterFieldName: 'exclude',
    // excludePattern: ['index/index.md'], // 排除的文件
    sortFolderTo: 'top', // TODO
    sortMenusByFrontmatterOrder: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
  }) as SidebarItem[]
).filter((item) => item.link !== '/index/index.md') // excludeFilesByFrontmatterFieldName 和 excludePattern 对这个文件起不了作用
function createOrderFrontmatter(p: string, order: number) {
  const { content, data } = matter.read(p)
  if (Object.keys(data).length !== 0) {
    data.order = order
    let str = '---\n'
    for (const key in data) {
      let value = (data[key] as string) ?? ''
      if (['date', 'lastEditTime'].includes(key)) {
        value = dayjs.utc(value).format('YYYY-MM-DD HH:mm:ss')
      }
      str += `${padStringToLength(key, 13)}:${value === '' ? '' : ` ${value}`}\n`
    }
    str += '---\n'
    str += content
    fs.writeFile(p, str, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err)
        return
      }
      console.log(`File ${p} updated successfully.`)
    })
  }
}

function handleLink(arr: SidebarItem[]): SidebarItem[] {
  return arr.map((item, index) => {
    if (item.link !== undefined) {
      createOrderFrontmatter(transformItemLinkToPath(item.link), index)
      item.link = item.link.replace('index.md', '')
    }
    if (item.items) {
      item.items = handleLink(item.items)
    }
    return item
  })
}

/**
 * @description: /css/@rules/@layer/index.md
 * @description: /css/@rules/@media
 */
function transformItemLinkToPath(link: string) {
  const str = link.endsWith('.md') ? link : `${link}.md`
  return resolveCwd(path.join(mdPageDir, str))
}
// console.log(handleLink(sidebar))

export default handleLink(sidebar)
