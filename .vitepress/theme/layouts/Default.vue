<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 09:28:46
 * @Description  :
-->
<script setup lang="ts"></script>

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
    <!-- <NLayoutSider
      v-if="showSider"
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      trigger-style="top: 240px;"
      collapsed-trigger-style="top: 240px; right: -20px;"
      bordered
      show-trigger="arrow-circle"
    >
      <NMenu :value="menuValue" :options="options" :render-label="renderMenuLabel" />
    </NLayoutSider> -->
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
