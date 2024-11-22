<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 13:57:51
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import layouts from './layouts/index'
import { useData, inBrowser } from 'vitepress'
import { getFilenameFromUrl } from '@/utils/url'
import { baseSize, designWidth } from '@/utils/config'

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
    // 计算比例
    const scale = commonStore.screenWidth / designWidth
    // 设置根字体大小
    document.documentElement.style.fontSize = `${baseSize * scale}px`
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
