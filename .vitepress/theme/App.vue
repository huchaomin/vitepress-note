<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 17:25:51
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import layouts from './layouts/index'
import SiteHeader from './components/SiteHeader.vue'
import { useData, inBrowser } from 'vitepress'
import { getFilenameFromUrl } from '@/utils/url'

const layoutMap: Record<string, Component> = {}
Object.keys(layouts).forEach((key) => {
  layoutMap[getFilenameFromUrl(key).toLowerCase()] = defineAsyncComponent(layouts[key])
})

const { frontmatter } = useData()

const showHeader = computed(() => {
  return frontmatter.value.header !== false
})

if (inBrowser) {
  watch(
    showHeader,
    (val) => {
      document.body.style.setProperty('--header-height', val ? '64px' : '0px')
    },
    {
      immediate: true,
    },
  )
}
</script>

<template>
  <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <SiteHeader v-if="showHeader"></SiteHeader>
    <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
  </NLayout>
  <NGlobalStyle></NGlobalStyle>
</template>
