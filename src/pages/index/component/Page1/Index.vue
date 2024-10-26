<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-26 22:07:45
 * @Description  :
-->
<script setup lang="ts">
import RefundScroll from './refundScroll/Index.vue'
</script>

<template>
  <div class="page1_wrapper absolute h-full w-full">
    <RefundScroll></RefundScroll>
  </div>
</template>

<style scoped>
.page1_wrapper {
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
