<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-16 09:29:08
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-02-07 09:56:27
 * @Description  :
-->
<script setup lang="ts">
import type { TreeOption, TreeOverrideNodeClickBehavior } from 'naive-ui'

import { findSidebarItemByKey, type SidebarItem } from '@/utils/index'
import { NEllipsis } from 'naive-ui'
import { useRoute } from 'vitepress'

const route = useRoute()
const sidebar = useSidebar()
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
const currentKeys = ref<string[]>([])
watch(
  () => route.path, // hash 和 query 都改变不了 path
  () => {
    const ck = getCurrentTreeKeys()
    currentKeys.value = ck
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

const lvl0TextPrefix = computed(() => {
  const arr = [...currentKeys.value]
  if (arr.length > 0) {
    arr.pop()
  }
  return arr.map((k) => findSidebarItemByKey(sidebar.value, k)!.text).join(' / ')
})

function renderLabel(isHidden: boolean, { option: op }: { option: TreeOption }) {
  const option = op as unknown as SidebarItem
  const isTheClosestParent = option.key === currentKeys.value.at(-1)
  const ellipsis = h(
    NEllipsis,
    {
      class: isTheClosestParent && isHidden ? 'algolia_lvl0' : '',
      tooltip: {
        placement: 'right',
      },
    },
    {
      default: () => option.text,
    },
  )
  if (option.link !== undefined) {
    return h(
      'a',
      {
        class: 'flex items-center',
        href: option.link,
        style: { height: 'var(--n-node-content-height)' },
      },
      ellipsis,
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
    :render-label="(...arg) => renderLabel(false, ...arg)"
  ></NTree>
  <!-- 爬虫用 -->
  <NTree
    class="hidden"
    label-field="text"
    children-field="items"
    :data="sidebar"
    default-expand-all
    :render-label="(...arg) => renderLabel(true, ...arg)"
  ></NTree>
  <div class="algolia_lvl0_text hidden">{{ lvl0TextPrefix }}</div>
</template>
