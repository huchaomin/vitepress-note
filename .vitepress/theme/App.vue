<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-19 15:03:49
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
  commonStore.screenHeight = window.innerHeight
  window.addEventListener('resize', () => {
    commonStore.screenWidth = window.innerWidth
    commonStore.screenHeight = window.innerHeight
  })
  // 根据屏幕宽度设置根字体大小
  function setRootFontSize(): void {
    const rate = (designFontSize - minFontSize) / (designScreenWidth - minScreenWidth)
    document.documentElement.style.fontSize = `${minFontSize + rate * (commonStore.screenWidth - minScreenWidth)}px`
  }
  watch(
    () => commonStore.screenWidth,
    () => {
      setRootFontSize()
      document.body.style.setProperty('--inner-width', `${commonStore.screenWidth}px`)
    },
    {
      immediate: true,
    },
  )
  watch(
    () => commonStore.screenHeight,
    () => {
      document.body.style.setProperty('--inner-height', `${commonStore.screenHeight}px`)
    },
    {
      immediate: true,
    },
  )
}

const { frontmatter } = useData()

const PWAReloadPrompt = defineAsyncComponent(() => import('./components/PWAReloadPrompt.vue'))
</script>

<template>
  <NLayout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <component :is="layoutMap[frontmatter.layout ?? 'default']"></component>
  </NLayout>
  <PWAReloadPrompt></PWAReloadPrompt>
  <NGlobalStyle></NGlobalStyle>
  <!-- 有些 tailwindcss 的预设没有被扫到，所以这里手动使用一下 -->
  <div class="-mr-3 -ml-8 hidden"></div>
</template>
