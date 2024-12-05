<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-05 18:04:14
 * @Description  :
-->
<script setup lang="ts">
import { inBrowser, useData } from 'vitepress'
import { useLocalNav } from 'vitepress/theme'

import LeftDrawer from '../components/LeftDrawer.vue'
import SiteAnchor from '../components/SiteAnchor.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'

const { frontmatter } = useData()
const { hasLocalNav, headers } = useLocalNav()

window.headers = headers

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
  return isMobile.value ? 'p-3' : 'p-8 flex-1'
})
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
        <!-- VPDoc 获取 anchor 时使用 -->
        <Content :class="contentClass" class="VPDoc"></Content>
        <div v-if="!isMobile && hasLocalNav" style="width: 240px;">
          <SiteAnchor :headers="headers"></SiteAnchor>
        </div>
      </div>
      <!-- 底部 -->
      <SiteFooter></SiteFooter>
    </NLayout>
  </NLayout>
</template>
