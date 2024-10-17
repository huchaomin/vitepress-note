<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 09:45:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-18 00:41:21
 * @Description  :
-->
<script setup lang="ts">
import type { TreeOverrideNodeClickBehavior } from 'naive-ui'
import { useData, useRouter, useRoute } from 'vitepress'

const { theme } = useData()
const router = useRouter()
const route = useRoute()

interface SidebarItem {
  collapsed?: boolean
  items?: SidebarItem[]
  key: string
  link: string
  text: string
}

function addKey(items: Omit<SidebarItem, 'key'>[], level: number) {
  return [...items].map((_item) => {
    const item = { ..._item, key: `${level}-${_item.text}` }
    if (item.items) {
      item.items = addKey(item.items, level + 1)
    }
    return item
  })
}

const sidebar = computed(() => {
  return addKey(theme.value.sidebar, 0)
})

const override: TreeOverrideNodeClickBehavior = ({ option }) => {
  if (option.children) {
    return 'toggleExpand'
  }
  return 'default'
}

function pushKeys(
  parent: null | SidebarItem,
  arr: SidebarItem[],
  link: string,
  keys: string[],
): boolean {
  const contain = arr.find((i) => i.link === link)
  const childrenContain = arr.some((c) => c.items && pushKeys(c, c.items, link, keys))
  if (contain || childrenContain) {
    if (contain) {
      keys.unshift(contain.key)
    }
    if (parent) {
      keys.unshift(parent.key)
    }
    return true
  }
  return false
}

// 有可能长度为 0, 但是 一般不展示这个视图
function getCurrentTreeKeys() {
  const keys: string[] = []
  pushKeys(null, sidebar.value, decodeURIComponent(route.path), keys)
  return keys
}
const currentKeys = getCurrentTreeKeys()
const selectedKeys = ref(currentKeys.length ? [currentKeys.pop()!] : [])
const expandedKeys = ref(currentKeys)

watch(
  () => route.path, // hash 和 query 都改变不了 path
  () => {
    const ck = getCurrentTreeKeys()
    selectedKeys.value = ck.length ? [ck.pop()!] : []
    expandedKeys.value = [...new Set([...ck, ...expandedKeys.value])]
  },
)

function handleUpdateSelectedKeys(_: string[], option: SidebarItem[]): void {
  const link = option[0]?.link
  if (link) {
    router.go(link)
  }
}
</script>

<template>
  <NLayoutSider
    v-if="!isTablet && !isMobile"
    :native-scrollbar="false"
    :collapsed-width="0"
    collapse-mode="transform"
    trigger-style="top: 240px;"
    collapsed-trigger-style="top: 240px; right: -20px;"
    bordered
    show-trigger="arrow-circle"
  >
    <NTree
      v-model:expanded-keys="expandedKeys"
      block-line
      :selected-keys="selectedKeys"
      label-field="text"
      children-field="items"
      selectable
      show-line
      expand-on-click
      :data="sidebar"
      :override-default-node-click-behavior="override"
      @update-selected-keys="handleUpdateSelectedKeys"
    ></NTree>
  </NLayoutSider>
</template>
