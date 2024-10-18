<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-18 23:18:17
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
  <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
  </NLayout>
  <NGlobalStyle></NGlobalStyle>
</template>
