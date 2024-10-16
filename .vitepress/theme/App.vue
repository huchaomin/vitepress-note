<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 18:09:38
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import { type GlobalThemeOverrides, zhCN, dateZhCN } from 'naive-ui'
import layouts from './layouts/index'
import SiteHeader from './components/SiteHeader.vue'
import { useData } from 'vitepress'
import { getFilenameFromUrl } from '@/utils/url'

const layoutMap: Record<string, Component> = {}
Object.keys(layouts).forEach((key) => {
  layoutMap[getFilenameFromUrl(key).toLowerCase()] = defineAsyncComponent(layouts[key])
})

const { frontmatter } = useData()

const showHeader = computed(() => {
  return frontmatter.value.header !== false
})

if (!import.meta.env.SSR) {
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
      <SiteHeader v-if="showHeader"></SiteHeader>
      <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
    </NLayout>
    <NGlobalStyle></NGlobalStyle>
  </NConfigProvider>
</template>
