<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 16:43:13
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 18:09:45
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../../ChartTitle.vue'
import bar_chart from '@/pages/index/assets/json/lottie/bar_chart.json?url'

</script>

<template>
  <div class="refund_user_wrapper absolute">
    <ChartTitle :src="bar_chart" title="回款客户数据"></ChartTitle>
  </div>
</template>

<style scoped>
.refund_user_wrapper {
  bottom: 8vw;
  left: 2vw;
  width: 22vw;
  height: 18vw;
}
</style>
