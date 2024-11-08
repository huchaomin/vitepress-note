<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 14:30:15
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import layouts from './layouts/index'
import { useData } from 'vitepress'
import { getFilenameFromUrl } from '@/utils/url'

const layoutMap: Record<string, Component> = {}
Object.keys(layouts).forEach((key) => {
  layoutMap[getFilenameFromUrl(key).toLowerCase()] = defineAsyncComponent(layouts[key])
})

const { frontmatter } = useData()
</script>

<template>
  <NLoadingBarProvider>
    <NNotificationProvider>
      <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
        <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
      </NLayout>
      <NGlobalStyle></NGlobalStyle>
    </NNotificationProvider>
  </NLoadingBarProvider>
</template>
