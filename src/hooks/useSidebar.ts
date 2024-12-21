/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-21 10:38:12
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-21 11:18:44
 * @Description  :
 */

import type { SidebarItem } from '@/utils/index'

import { useData } from 'vitepress'

// 递归添加 key
function addKey(items: SidebarItem[], level: number) {
  return [...items].map((_item) => {
    const item = { ..._item, key: `${level}-${_item.text}` }
    if (item.items) {
      item.items = addKey(item.items, level + 1)
    }
    return item
  })
}

const arr = ref<SidebarItem[]>([])
export default () => {
  const { theme } = useData()
  // eslint-disable-next-line ts/no-unsafe-member-access
  arr.value = theme.value.sidebar as SidebarItem[]
  return computed(() => {
    return addKey(arr.value, 0)
  })
}
