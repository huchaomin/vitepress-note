<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-15 18:08:40
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-16 16:42:11
 * @Description  :
-->
<script setup lang="ts">
import 'hamburgers/dist/hamburgers.min.css'
import { inBrowser, useRoute } from 'vitepress'

import LeftDrawerTree from './LeftDrawerTree.vue'

const commonStore = useCommonStore(piniaInstance)
const route = useRoute()

function toggleLeftDrawer() {
  commonStore.showLeftDrawer = !commonStore.showLeftDrawer
}

if (inBrowser && (isMobile || isTablet)) {
  watch(
    () => commonStore.showLeftDrawer,
    (val) => {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  )
}

watch(
  () => route.path,
  () => {
    if (inBrowser && (isTablet.value || isMobile.value)) {
      commonStore.showLeftDrawer = false
    }
  },
)

function clickOutside(e: MouseEvent) {
  const hamburgerBtn = document.querySelector('#hamburger')
  if (hamburgerBtn && hamburgerBtn.contains(e.target as HTMLElement)) {
    return
  }
  commonStore.showLeftDrawer = false
}
</script>

<template>
  <NPopover
    :disabled="!isMobile && !isTablet"
    placement="bottom-start"
    display-directive="show"
    trigger="manual"
    :show="commonStore.showLeftDrawer"
    scrollable
    :on-clickoutside="clickOutside"
    content-style="max-height: calc(var(--inner-height) - var(--header-height) - 20px); width: var(--sider-width); padding: 0;"
  >
    <template #trigger>
      <NButton
        id="hamburger"
        :class="{
          'is-active': commonStore.showLeftDrawer,
        }"
        class="hamburger hamburger--minus"
        quaternary
        size="large"
        @click="toggleLeftDrawer"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </NButton>
    </template>
    <LeftDrawerTree></LeftDrawerTree>
  </NPopover>
</template>

<style scoped>
.n-button {
  --n-height: var(--header-height);

  /* stylelint-disable-next-line selector-class-pattern */
  .hamburger-box,
  .hamburger-inner,
  .hamburger-inner::after,
  .hamburger-inner::before {
    width: 24px;
    height: 2px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .hamburger-box {
    height: auto;
  }
}
</style>
