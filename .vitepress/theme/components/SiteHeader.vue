<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-16 23:23:20
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-30 17:36:21
 * @Description  :
-->
<script setup lang="ts">
const style = computed(() => {
  return isMobile.value
    ? {
        'grid-template-columns': 'auto 1fr auto',
      }
    : {
        'grid-template-columns': 'var(--sider-width) 1fr auto',
      }
})

function handleLogoClick() {
  // TODO: handleLogoClick
}

const Hamburgers = defineAsyncComponent(() => import('./Hamburger.vue'))
const NavSearch = defineAsyncComponent(() => import('./NavSearch.vue'))
const ChangeTheme = defineAsyncComponent(() => import('./ChangeTheme.vue'))
</script>

<template>
  <NLayoutHeader bordered :style="style">
    <div class="flex items-center">
      <Hamburgers></Hamburgers>
      <NText tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
        <!-- <img src="./assets/images/naivelogo.svg" /> -->
        <span v-if="!isMobile">mu</span>
      </NText>
    </div>
    <NavSearch></NavSearch>
    <ChangeTheme></ChangeTheme>
  </NLayoutHeader>
</template>

<style scoped>
.n-layout-header {
  --side-padding: 0;

  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}
</style>
