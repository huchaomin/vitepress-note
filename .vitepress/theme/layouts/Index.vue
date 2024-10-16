<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 11:36:58
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import { type GlobalThemeOverrides, zhCN, dateZhCN } from 'naive-ui'
import Default from './Default.vue'
import SiteHeader from './modules/SiteHeader.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

console.log(frontmatter)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '4px',
    fontFamily: 'var(--font-family-base)',
    fontFamilyMono: 'var(--font-family-mono)',
    infoColor: '#697FEDFF',
    infoColorHover: '#9AADFEFF',
    infoColorPressed: '#596CDBFF',
    infoColorSuppl: '#9AADFEFF',
    primaryColor: '#697FEDFF',
    primaryColorHover: '#9AADFEFF',
    primaryColorPressed: '#596CDBFF',
    primaryColorSuppl: '#9AADFEFF',
  },
}
</script>

<template>
  <NConfigProvider
    :breakpoints="breakpointsTailwind"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    inline-theme-disabled
    abstract
  >
    <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
      <SiteHeader></SiteHeader>
      <Default></Default>
    </NLayout>
    <NGlobalStyle></NGlobalStyle>
  </NConfigProvider>
</template>
