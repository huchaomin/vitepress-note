/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-19 23:43:41
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-17 16:26:07
 * @Description  : index.md 的文件可以做入口文件
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import matter from 'gray-matter'
import fs from 'node:fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'
import { generateSidebar } from 'vitepress-sidebar'

import { mdPageDir, resolveCwd } from '../utils/index.ts'
import sidebarFolderOrder from './sidebarFolderOrder.json' assert { type: 'json' }

export type SidebarItem = SidebarGroupItem | SidebarSingleItem

interface SidebarGroupItem {
  _folderKey: string
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
).filter((item) => (item as SidebarSingleItem).link !== '/index/index.md') // TODO excludeFilesByFrontmatterFieldName 和 excludePattern 对这个文件起不了作用
function createOrderFrontmatter(p: string, order: number) {
  const { content, data } = matter.read(p)
  if (Object.keys(data).length !== 0) {
    if (data.order === order && data.uuid !== undefined) {
      return
    }
    data.order = order
    data.uuid = uuidv4()
    let str = '---\n'
    const arr = ['uuid', 'order', 'author', 'date', 'lastEditTime', 'lastEditors', 'description']
    const keys = Object.keys(data).sort((a, b) => {
      return arr.indexOf(a) - arr.indexOf(b)
    })
    for (const key of keys) {
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
  const result = arr
    .map((item, index) => {
      // sortFolderTo 先处理文件夹
      if ((item as SidebarGroupItem).items !== undefined) {
        const folderKey = `${p}/${item.text}`
        ;(item as SidebarGroupItem)._folderKey = folderKey
        ;(item as SidebarGroupItem).items = handleLink((item as SidebarGroupItem).items, folderKey)
        const order = (sidebarFolderOrder as Record<string, number>)[folderKey] ?? index
        ;(item as SidebarGroupItem).order = order
        folderOrderArr.push(order)
      }

      folderOrderArr.sort((a, b) => a - b)
      if ((item as SidebarSingleItem).link !== undefined) {
        let fileIndex = index - folderOrderArr.length
        while (folderOrderArr.find((v) => v <= fileIndex) !== undefined) {
          folderOrderArr.shift()
          fileIndex++
        }
        createOrderFrontmatter(transformItemLinkToPath((item as SidebarSingleItem).link), fileIndex)
        item.order = fileIndex
        ;(item as SidebarSingleItem).link = (item as SidebarSingleItem).link.replace('index.md', '')
      }
      item.text = item.text.replace(/\s+/g, '') // 把莫名其妙生成的空格去掉
      return item
    })
    .sort((a, b) => a.order - b.order)
  result.forEach((item, index) => {
    if ((item as SidebarGroupItem)._folderKey) {
      copySidebarFolderOrder[(item as SidebarGroupItem)._folderKey] = index
    }
  })
  return result
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
