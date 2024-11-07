<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 14:40:37
 * @Description  :
-->
<script setup lang="ts">
import RefundScroll from './refundScroll/Index.vue'
import RefundUser from './refundUser/Index.vue'
import HeaderBar from './header/Index.vue'
import AssetDistribution from './assetDistribution/Index.vue'
import RefundType from './refundType/Index.vue'
import RefundTrend from './refundTrend/Index.vue'
import RefundTotal from './refundTotal/Index.vue'
import AssetSize from './assetSize/Index.vue'
import FooterBar from './footer/Index.vue'
</script>

<template>
  <div class="page1_wrapper absolute h-full w-full">
    <HeaderBar></HeaderBar>
    <RefundScroll></RefundScroll>
    <AssetDistribution></AssetDistribution>
    <RefundUser></RefundUser>
    <RefundType></RefundType>
    <RefundTrend></RefundTrend>
    <RefundTotal></RefundTotal>
    <AssetSize></AssetSize>
    <FooterBar></FooterBar>
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
