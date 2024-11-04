<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-04 13:48:59
 * @Description  :
-->
<script setup lang="ts">
import RefundScroll from './refundScroll/Index.vue'
import RefundUser from './refundUser/Index.vue'
import Header from './header/Index.vue'
import AssetDistribution from './assetDistribution/Index.vue'
import RefundType from './refundType/Index.vue'
</script>

<template>
  <div class="page1_wrapper absolute h-full w-full">
    <Header></Header>
    <RefundScroll></RefundScroll>
    <AssetDistribution></AssetDistribution>
    <RefundUser></RefundUser>
    <RefundType></RefundType>
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
