<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:20:35
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-09 23:36:29
 * @Description  :
-->
<script setup lang="ts">
import headerSvg from '@/pages/index/assets/svg/header.svg?raw'
</script>

<template>
  <div class="header_wrapper absolute">
    <h1 class="header_title absolute">擎聪智慧大屏系统</h1>
    <div v-html="headerSvg"></div>
  </div>
</template>

<style scoped>
.header_wrapper {
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  opacity: 0;
  transform: translateY(-100%);
}

.header_title {
  top: 0.2vw;
  left: 50%;
  font-family: system-ui;
  font-size: 2.2vw;
  letter-spacing: 1.2vw;
  fill: var(--color-white);
  transform: translateX(calc(-50% + 0.6vw));
}
</style>
