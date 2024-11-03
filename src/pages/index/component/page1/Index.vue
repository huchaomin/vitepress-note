<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-03 21:57:58
 * @Description  :
-->
<script setup lang="ts">
import RefundScroll from './refundScroll/Index.vue'
import RefundUser from './refundUser/Index.vue'
import Header from './header/Index.vue'
</script>

<template>
  <div class="page1_wrapper absolute h-full w-full">
    <Header></Header>
    <RefundScroll></RefundScroll>
    <RefundUser></RefundUser>
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
