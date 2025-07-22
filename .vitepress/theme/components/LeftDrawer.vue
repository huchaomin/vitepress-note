<!--
 * @Author       : peter
 * @Date         : 2024-10-17 09:45:38
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-16 10:52:03
 * @Description  :
-->
<script setup lang="ts">
import LeftDrawerTree from './LeftDrawerTree.vue'

const commonStore = useCommonStore(piniaInstance)
</script>

<template>
  <NLayoutSider
    v-if="!isTablet && !isMobile"
    :native-scrollbar="false"
    :collapsed-width="0"
    collapse-mode="transform"
    bordered
    width="var(--sider-width)"
    :show-trigger="false"
    :collapsed="!commonStore.showLeftDrawer"
  >
    <LeftDrawerTree></LeftDrawerTree>
  </NLayoutSider>
</template>
