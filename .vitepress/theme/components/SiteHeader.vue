<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-16 23:23:20
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-15 22:10:17
 * @Description  :
-->
<script setup lang="ts">
import NavSearch from './NavSearch.vue'

const style = computed(() => {
  return isMobile.value
    ? {
        'grid-template-columns': 'auto 1fr auto',
      }
    : {
        'grid-template-columns': '300px 1fr auto',
      }
})

function handleLogoClick() {
  // TODO: handleLogoClick
}

const Hamburgers = defineAsyncComponent(() => import('./Hamburger.vue'))
</script>

<template>
  <NLayoutHeader bordered class="nav" :style="style">
    <div>
      <Hamburgers></Hamburgers>
    </div>
    <NText tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
      <!-- <img src="./assets/images/naivelogo.svg" /> -->
      <span v-if="!isMobile">mu</span>
    </NText>
    <NavSearch></NavSearch>
  </NLayoutHeader>
</template>

<style scoped>
.nav {
  --side-padding: 0;

  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}
</style>
