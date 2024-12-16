<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-15 18:08:40
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-16 10:56:05
 * @Description  :
-->
<script setup lang="ts">
import 'hamburgers/dist/hamburgers.min.css'

import LeftDrawerTree from './LeftDrawerTree.vue'

const commonStore = useCommonStore(piniaInstance)

function clickOutside(e: MouseEvent) {
  const hamburgerBtn = document.querySelector('#hamburger')
  if (hamburgerBtn && hamburgerBtn.contains(e.target as HTMLElement)) {
    return
  }
  commonStore.showLeftDrawer = false
}

function toggleLeftDrawer() {
  commonStore.showLeftDrawer = !commonStore.showLeftDrawer
}
</script>

<template>
  <NPopover
    :disabled="!isMobile && !isTablet"
    style="width: var(--sider-width); padding: 0;"
    placement="bottom-start"
    display-directive="show"
    trigger="manual"
    :show="commonStore.showLeftDrawer"
    :on-clickoutside="clickOutside"
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
    <div style="max-height: calc(100vh - var(--header-height) - 20px); overflow: auto;">
      <LeftDrawerTree></LeftDrawerTree>
    </div>
  </NPopover>
</template>

<style scoped>
.n-button {
  --n-height: var(--header-height);

  :deep() {
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
}
</style>
