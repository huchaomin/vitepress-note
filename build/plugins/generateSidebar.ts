/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-19 23:43:41
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-19 23:59:51
 * @Description  : index.md 或 同文件夹名称的文件都可以做入口文件，但不要同时存在
 */
import { generateSidebar, type SidebarItem } from 'vitepress-sidebar'

// https://vitepress-sidebar.cdget.com/zhHans/guide/api#excludepattern

const sidebar = (
  generateSidebar({
    convertSameNameSubFileToGroupIndexPage: true,
    debugPrint: true,
    documentRootPath: 'src/pages',
    excludeFilesByFrontmatterFieldName: 'exclude',
    // sortMenusByFrontmatterOrder: true, // TODO
    // excludePattern: ['index/index.md'], // 排除的文件
    sortFolderTo: 'top', // TODO
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
  }) as SidebarItem[]
).filter((item) => item.link !== '/index/index.md') // excludeFilesByFrontmatterFieldName 和 excludePattern 对这个文件起不了作用

function handleLink(arr: SidebarItem[]): SidebarItem[] {
  return arr.map((item) => {
    if (item.link) {
      item.link = item.link.replace('index.md', '')
    }
    if (item.items) {
      item.items = handleLink(item.items)
    }
    return item
  })
}

export default handleLink(sidebar)
