<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-13 18:25:12
 * @Description  :
-->
<script setup lang="ts">
import type { LayoutInst } from 'naive-ui'
import type { DefaultTheme } from 'vitepress/theme'

import autoAnimate from '@formkit/auto-animate'
import { inBrowser, useData, useRoute } from 'vitepress'
// @ts-expect-error import { useLocalNav } from 'vitepress/theme' 回导入很多不需要的东西
import { useLocalNav } from 'vitepress/dist/client/theme-default/composables/local-nav.js'

import LeftDrawer from '../components/LeftDrawer.vue'
import SiteAnchor from '../components/SiteAnchor.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'

const { frontmatter } = useData()
const { hasLocalNav, headers } = (useLocalNav as () => DefaultTheme.DocLocalNav)()

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

const route = useRoute()
const nLayoutRef = ref<LayoutInst | null>(null)
watch(route, () => {
  nLayoutRef.value!.scrollTo({
    top: 0,
  })
})

const contentWrapperClass = computed(() => {
  return isMobile.value ? '' : 'flex'
})

const contentClass = computed(() => {
  return isMobile.value ? 'p-3' : 'p-8 pr-3 flex-1'
})

const contentRef = ref<any | null>(null)
onMounted(() => {
  autoAnimate(contentRef.value!.$el)
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
      ref="nLayoutRef"
      :scrollbar-props="{
        containerClass: 'document-scroll-container',
      }"
      :native-scrollbar="false"
      :position="isTablet ? 'absolute' : 'static'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <div :class="contentWrapperClass">
        <!-- VPDoc class 获取 h标题 时使用 -->
        <Content ref="contentRef" :class="contentClass" class="VPDoc"></Content>
        <SiteAnchor
          v-if="!isMobile && hasLocalNav"
          style="width: 240px;"
          :headers="headers"
        ></SiteAnchor>
      </div>
      <!-- 底部 -->
      <SiteFooter></SiteFooter>
    </NLayout>
  </NLayout>
</template>
