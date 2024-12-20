/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-20 22:26:25
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-20 22:28:16
 * @Description  :
 */

export interface SidebarItem {
  items?: SidebarItem[]
  key: string
  link: string
  text: string
}

function findSidebarLeafIndex(root: SidebarItem[], link: string) {
  let index = -1
  let currentIndex = 0
  function dfs(node: SidebarItem[]) {
    for (const child of node) {
      if (!child.items || child.items.length === 0) {
        // 这是一个叶子节点
        if (child.link === link) {
          index = currentIndex
        }
        currentIndex++
      } else {
        dfs(child.items)
      }
    }
  }
  dfs(root)
  return index
}

export { findSidebarLeafIndex }
