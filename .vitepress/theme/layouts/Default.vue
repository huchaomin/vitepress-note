<!--
 * @Author       : peter
 * @Date         : 2024-10-15 17:26:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-24 15:49:36
 * @Description  :
-->
<script setup lang="ts">
import type { LayoutInst } from 'naive-ui'
import type { DefaultTheme } from 'vitepress/theme'

import { findSidebarLeafIndex } from '@/utils/index'
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
const Comment = defineAsyncComponent(() => import('../components/Comment.vue'))

const showHeader = computed(() => {
  return frontmatter.value.header !== false
})
const route = useRoute()
const nLayoutRef = ref<LayoutInst | null>(null)
if (inBrowser) {
  watch(
    showHeader,
    (val) => {
      document.body.style.setProperty('--header-height', val ? '52px' : '0px')
    },
    {
      immediate: true,
    },
  )
  watch(
    () => route.path,
    () => {
      nextTick(() => {
        const hash = decodeURI(location.hash)
        if (!hash) {
          nLayoutRef.value!.scrollTo({
            top: 0,
          })
        }
      })
    },
    {
      immediate: true, // 这个layout 不一定是第一个，所以需要立即执行
    },
  )
}

const sidebar = useSidebar()
const pageTranslateDirection = ref<'left' | 'right'>('left')
watch(
  () => route.path,
  (newVal, oldVal) => {
    const prevIndex = findSidebarLeafIndex(sidebar.value, decodeURI(oldVal))
    const nextIndex = findSidebarLeafIndex(sidebar.value, decodeURI(newVal))
    pageTranslateDirection.value = nextIndex > prevIndex ? 'left' : 'right'
  },
)
const contentRef = ref<any | null>(null)
onMounted(() => {
  autoAnimate(contentRef.value!.$el, (el, action) => {
    let keyframes: Keyframe[] = []
    if (action === 'add') {
      keyframes = [
        {
          opacity: 0,
          transform: `translateX(${pageTranslateDirection.value === 'left' ? '' : '-'}50%)`,
        },
        { opacity: 1, transform: 'translateX(0)' },
      ]
    }
    // keyframes can have as many "steps" as you prefer
    // and you can use the 'offset' key to tune the timing
    if (action === 'remove') {
      keyframes = [
        { opacity: 1, transform: 'translateX(0)' },
        {
          opacity: 0,
          transform: `translateX(${pageTranslateDirection.value === 'left' ? '-' : ''}50%)`,
        },
      ]
    }
    return new KeyframeEffect(el, keyframes, { duration: 400, easing: 'ease-in-out' })
  })
})

const contentClass = computed(() => {
  return isMobile.value ? 'p-3' : 'p-8 pr-3'
})
</script>

<template>
  <SiteHeader v-if="showHeader"></SiteHeader>
  <!-- TODO content-class="flex" 保证右侧的 toc position sticky 生效 -->
  <NLayout
    id="doc-layout"
    :has-sider="!isTablet && !isMobile"
    :position="isMobile ? 'static' : 'absolute'"
    :style="{
      top: isMobile ? '' : 'var(--header-height)',
    }"
    content-class="flex"
  >
    <!-- 左侧菜单 -->
    <LeftDrawer></LeftDrawer>
    <NLayout
      ref="nLayoutRef"
      :native-scrollbar="false"
      content-style="min-height: calc(var(--inner-height) - var(--header-height)); display: flex; flex-direction: column;"
    >
      <div :class="isMobile ? '' : 'flex'" class="flex-auto">
        <div :class="isMobile ? '' : 'flex-1'" class="flex flex-col overflow-hidden">
          <Content ref="contentRef" class="pt-0" :class="contentClass"></Content>
          <Comment class="mt-auto" :class="contentClass"></Comment>
        </div>
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
