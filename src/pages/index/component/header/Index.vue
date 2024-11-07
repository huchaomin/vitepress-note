<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:20:35
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 16:10:47
 * @Description  :
-->
<script setup lang="ts">
import headerSvg from '@/pages/index/assets/svg/header.svg?raw'
</script>

<template>
  <div class="header_wrapper absolute" v-html="headerSvg"></div>
</template>

<style scoped>
.header_wrapper {
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
</style>
