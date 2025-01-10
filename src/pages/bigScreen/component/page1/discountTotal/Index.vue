<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2025-01-09 11:44:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-10 11:20:08
 * @Description  :
-->
<script setup lang="ts">
import discount from '@/pages/bigScreen/assets/json/lottie/discount.json?raw'
import { formatNumber } from '@/utils/format'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const shareData: Record<string, any> = inject('shareData')!

const total = toRef(() => shareData.mainData.totalDiscountAmt)
</script>

<template>
  <div class="discount_total_wrapper align-center absolute flex">
    <DotLottieVue
      :render-config="{
        autoResize: true,
      }"
      class="icon absolute"
      autoplay
      loop
      :data="discount"
    ></DotLottieVue>
    <span>减免额度：</span>
    <NNumberAnimation :to="total" :precision="2" show-separator></NNumberAnimation>
    <span class="pl-1">元</span>
  </div>
</template>

<style scoped>
.discount_total_wrapper {
  top: 8.5vw;
  font-size: 1.2vw;
  opacity: 0;
  transform: translateY(-1.67vw);
}

.icon {
  top: 40%;
  left: -1.4vw;
  width: 6vw;
  transform: translate(-50%, -50%);
}
</style>
