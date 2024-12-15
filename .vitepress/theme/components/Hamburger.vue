<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-15 18:08:40
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-15 22:32:03
 * @Description  :
-->
<script setup lang="ts">
import 'hamburgers/dist/hamburgers.min.css'

const commonStore = useCommonStore(piniaInstance)

function toggleLeftDrawer() {
  commonStore.showLeftDrawer = !commonStore.showLeftDrawer
}
</script>

<template>
  <NButton
    :class="{
      'is-active': !commonStore.showLeftDrawer,
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

<style scoped>
.n-button {
  --n-height: var(--header-height);

  :deep() {
    /* stylelint-disable-next-line selector-class-pattern */
    .hamburger-box,
    .hamburger-inner,
    .hamburger-inner::after,
    .hamburger-inner::before {
      width: 30px;
      height: 1.5px;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    .hamburger-box {
      height: auto;
    }
  }
}
</style>
