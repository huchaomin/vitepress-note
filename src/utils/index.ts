/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-20 22:26:25
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-21 10:30:26
 * @Description  :
 */

export interface SidebarItem {
  items?: SidebarItem[]
  key: string
  link: string
  text: string
}

function findSidebarItemByKey(root: SidebarItem[], key: string): SidebarItem | undefined {
  let result: SidebarItem | undefined
  function dfs(node: SidebarItem[]) {
    for (const child of node) {
      if (child.key === key) {
        result = child
        return
      }
      if (child.items) {
        dfs(child.items)
      }
    }
  }
  dfs(root)
  return result
}

function findSidebarLeafIndex(root: SidebarItem[], link: string) {
  let index = -1
  let currentIndex = 0
  function dfs(node: SidebarItem[]) {
    for (const child of node) {
      if (child.items) {
        dfs(child.items)
      } else {
        if (child.link === link) {
          index = currentIndex
        }
        currentIndex++
      }
    }
  }
  dfs(root)
  return index
}

export { findSidebarItemByKey, findSidebarLeafIndex }
