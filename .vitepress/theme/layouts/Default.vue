<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 09:47:00
 * @Description  :
-->
<script setup lang="ts">
import LeftDrawer from '../components/LeftDrawer.vue'
</script>

<template>
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
