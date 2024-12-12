<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:20:35
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-20 15:01:23
 * @Description  :
-->
<script setup lang="ts"></script>

<template>
  <div class="header_wrapper absolute">
    <h1 class="header_title absolute">擎聪智能</h1>
    <img src="@/pages/bigScreen/assets/svg/header.svg" alt="" />
  </div>
</template>

<style scoped>
.header_wrapper {
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-100%);
}

.header_title {
  top: 0.2vw;
  left: 50%;
  font-family: system-ui;
  font-size: 2.2vw;
  letter-spacing: 2vw;
  fill: var(--color-white);
  transform: translateX(calc(-50% + 0.6vw));
}
</style>
