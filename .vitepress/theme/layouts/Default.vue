<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-26 10:53:22
 * @Description  :
-->
<script setup lang="ts">
import { inBrowser, useData } from 'vitepress'

import LeftDrawer from '../components/LeftDrawer.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'

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

const contentWrapperClass = computed(() => {
  return isMobile.value ? '' : 'flex'
})

const contentClass = computed(() => {
  return isMobile.value ? 'p-12 vp_doc overflow-hidden' : 'p-8 mr-8 flex-1 vp_doc overflow-hidden'
})
</script>

<template>
  <SiteHeader v-if="showHeader"></SiteHeader>
  <!-- TODO id -->
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
    <!-- TODO document-scroll-container -->
    <!-- position absolute 时，右侧的 toc position sticky 才会生效 -->
    <NLayout
      :scrollbar-props="{
        containerClass: 'document-scroll-container',
      }"
      :native-scrollbar="false"
      :position="isTablet ? 'absolute' : 'static'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <div :class="contentWrapperClass">
        <Content :class="contentClass"></Content>
        <div v-if="!isMobile" style="width: 240px;">
          <!-- <Anchor></Anchor> -->
        </div>
      </div>
      <!-- 底部 -->
      <SiteFooter></SiteFooter>
    </NLayout>
  </NLayout>
</template>
