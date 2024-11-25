<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-25 16:35:27
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import { designFontSize, designScreenWidth, minFontSize, minScreenWidth } from '@/utils/config'
import { getFilenameFromUrl } from '@/utils/url'
import { inBrowser, useData } from 'vitepress'

import layouts from './layouts/index'

const commonStore = useCommonStore(piniaInstance)

const layoutMap: Record<string, Component> = {}
Object.keys(layouts).forEach((key) => {
  layoutMap[getFilenameFromUrl(key).toLowerCase()] = defineAsyncComponent(layouts[key])
})

if (inBrowser) {
  commonStore.screenWidth = window.innerWidth
  window.addEventListener('resize', () => {
    commonStore.screenWidth = window.innerWidth
  })
  // 根据屏幕宽度设置根字体大小
  function setRootFontSize(): void {
    const rate = (designFontSize - minFontSize) / (designScreenWidth - minScreenWidth)
    document.documentElement.style.fontSize = `${minFontSize + rate * (commonStore.screenWidth - minScreenWidth)}px`
  }
  watch(() => commonStore.screenWidth, setRootFontSize, {
    immediate: true,
  })
}

const { frontmatter } = useData()
</script>

<template>
  <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
  </NLayout>
  <NGlobalStyle></NGlobalStyle>
</template>
