/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-19 23:43:41
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-10 14:58:40
 * @Description  : index.md 的文件可以做入口文件
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import matter from 'gray-matter'
import fs from 'node:fs'
import path from 'node:path'
import { generateSidebar } from 'vitepress-sidebar'

import { mdPageDir, resolveCwd } from '../utils/index.ts'
import sidebarFolderOrder from './sidebarFolderOrder.json' assert { type: 'json' }

export type SidebarItem = SidebarGroupItem | SidebarSingleItem

interface SidebarGroupItem {
  items: SidebarItem[]
  order: number
  text: string
}

interface SidebarSingleItem {
  link: string
  order: number
  text: string
}

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
    sortFolderTo: 'top',
    sortMenusByFrontmatterOrder: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
  }) as SidebarItem[]
).filter((item) => (item as SidebarSingleItem).link !== '/index/index.md') // excludeFilesByFrontmatterFieldName 和 excludePattern 对这个文件起不了作用
function createOrderFrontmatter(p: string, order: number) {
  const { content, data } = matter.read(p)
  if (Object.keys(data).length !== 0) {
    if (data.order === order) {
      return
    }
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

const copySidebarFolderOrder: Record<string, number> = {}

function generate() {
  const result = handleLink(sidebar, '')
  const jsonString = JSON.stringify(copySidebarFolderOrder, null, 2)
  fs.writeFile(
    resolveCwd('build/plugins/sidebarFolderOrder.json'),
    `${jsonString}\n`,
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing to the file:', err)
        return
      }
      console.log('File sidebarFolderOrder.json updated successfully.')
    },
  )
  return result
}

function handleLink(arr: SidebarItem[], p: string): SidebarItem[] {
  const folderOrderArr: number[] = []
  return arr
    .map((item, index) => {
      // sortFolderTo 先处理文件夹
      if ((item as SidebarGroupItem).items !== undefined) {
        const folderKey = `${p}/${item.text}`
        ;(item as SidebarGroupItem).items = handleLink((item as SidebarGroupItem).items, folderKey)
        const order = (sidebarFolderOrder as Record<string, number>)[folderKey] ?? index
        ;(item as SidebarGroupItem).order = order
        folderOrderArr.push(order)
        copySidebarFolderOrder[folderKey] = order
      }

      if ((item as SidebarSingleItem).link !== undefined) {
        const i = index - folderOrderArr.filter((v) => v >= index).length
        createOrderFrontmatter(transformItemLinkToPath((item as SidebarSingleItem).link), i)
        item.order = i
        ;(item as SidebarSingleItem).link = (item as SidebarSingleItem).link.replace('index.md', '')
      }
      return item
    })
    .sort((a, b) => a.order - b.order)
}

/**
 * @description: /css/@rules/@layer/index.md
 * @description: /css/@rules/@media
 */
function transformItemLinkToPath(link: string) {
  const str = link.endsWith('.md') ? link : `${link}.md`
  return resolveCwd(path.join(mdPageDir, str))
}

export default generate()
