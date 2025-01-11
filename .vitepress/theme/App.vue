<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 09:42:52
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-11 11:14:56
 * @Description  : 主题颜色
-->
<script setup lang="ts">
import { designFontSize, designScreenWidth, minFontSize, minScreenWidth } from '@/utils/config'
import { getFilenameFromUrl } from '@/utils/url'
import { inBrowser, onContentUpdated, useData } from 'vitepress'

import layouts from './layouts/index'

const commonStore = useCommonStore(piniaInstance)

const layoutMap: Record<string, Component> = {}
Object.keys(layouts).forEach((key) => {
  layoutMap[getFilenameFromUrl(key).toLowerCase()] = defineAsyncComponent(layouts[key])
})

if (inBrowser) {
  const { height, width } = useWindowSize()
  // 根据屏幕宽度设置根字体大小
  function setRootFontSize(): void {
    const rate = (designFontSize - minFontSize) / (designScreenWidth - minScreenWidth)
    document.documentElement.style.fontSize = `${minFontSize + rate * (commonStore.screenWidth - minScreenWidth)}px`
  }
  watch(
    width,
    (val) => {
      commonStore.screenWidth = val
      setRootFontSize()
      document.documentElement.style.setProperty('--inner-width', `${commonStore.screenWidth}px`)
    },
    {
      immediate: true,
    },
  )
  watch(
    height,
    (val) => {
      commonStore.screenHeight = val
      document.documentElement.style.setProperty('--inner-height', `${commonStore.screenHeight}px`)
    },
    {
      immediate: true,
    },
  )
}

const { frontmatter } = useData()

const PWAReloadPrompt = defineAsyncComponent(() => import('./components/PWAReloadPrompt.vue'))

function scrollAnchorIntoView(): void {
  const hash = decodeURI(location.hash)
  if (hash) {
    nextTick(() => {
      setTimeout(() => {
        const anchor = document.getElementById(hash.slice(1))
        if (anchor) {
          anchor.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }, 500) // 翻页动画执行完毕
    })
  }
}

onContentUpdated(scrollAnchorIntoView)

onMounted(() => {
  // 初始化时调用一次: 第一次进来(有/无)hash, 同一个页面hash变化，都会进该方法
  window.addEventListener('hashchange', scrollAnchorIntoView)
  scrollAnchorIntoView() // 初始化时调用一次
})

onUnmounted(() => {
  window.removeEventListener('hashchange', scrollAnchorIntoView)
})
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
