<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-16 09:29:08
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-16 09:30:17
 * @Description  :
-->
<script setup lang="ts">
import type { TreeOption, TreeOverrideNodeClickBehavior } from 'naive-ui'

import { NEllipsis } from 'naive-ui'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

export interface SidebarItem {
  items?: SidebarItem[]
  key: string
  link: string
  text: string
}

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

const sidebar = computed(() => {
  return addKey(theme.value.sidebar, 0)
})

// 有可能长度为 0, 但是 一般不展示这个视图, 比如首页
function getCurrentTreeKeys() {
  const keys: string[] = []
  pushKeys(null, sidebar.value, decodeURIComponent(route.path), keys)
  return keys
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

const selectedKeys = ref<string[]>([])
const expandedKeys = ref<string[]>([])
watch(
  () => route.path, // hash 和 query 都改变不了 path
  () => {
    const ck = getCurrentTreeKeys()
    selectedKeys.value = ck.length ? [ck.pop()!] : []
    expandedKeys.value = [...new Set([...ck, ...expandedKeys.value])]
  },
  {
    immediate: true,
  },
)

const override: TreeOverrideNodeClickBehavior = ({ option }) => {
  if (option.children) {
    return 'toggleExpand'
  }
  return 'default'
}

function renderLabel({ option }: { option: TreeOption }) {
  const ellipsis = h(
    NEllipsis,
    {
      tooltip: {
        placement: 'right',
      },
    },
    { default: () => option.text },
  )
  if (option.link !== undefined) {
    return h(
      'a',
      {
        class: 'flex items-center',
        href: option.link,
        style: { height: 'var(--n-node-content-height)' },
      },
      {
        default: () => [ellipsis],
      },
    )
  } else {
    return ellipsis
  }
}
</script>

<template>
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
    :render-label="renderLabel"
  ></NTree>
</template>
