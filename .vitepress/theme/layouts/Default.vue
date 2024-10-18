<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-18 23:18:08
 * @Description  :
-->
<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import LeftDrawer from '../components/LeftDrawer.vue'
import { inBrowser, useData } from 'vitepress'

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
  <SiteHeader v-if="showHeader"></SiteHeader>
  <NLayout
    id="doc-layout"
    :has-sider="!isTablet && !isMobile"
    :position="isMobile ? 'static' : 'absolute'"
    :style="{
      top: isMobile ? '' : 'var(--header-height)',
    }"
  >
    <!-- 左侧菜单 -->
    <LeftDrawer></LeftDrawer>
    <NLayout
      :scrollbar-props="{
        containerClass: 'document-scroll-container',
      }"
      :native-scrollbar="false"
      :position="isMobile || (!isTablet && !isMobile) ? 'static' : 'absolute'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <Content></Content>
      <!-- 底部 -->
      <!-- <SiteFooter /> -->
    </NLayout>
  </NLayout>
</template>
