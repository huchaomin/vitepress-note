<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 09:24:31
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import refund_gather from '@/pages/index/assets/json/lottie/refund_gather.json?raw'
import { formatNumber } from '@/utils/format'

const shareData: Record<string, any> = inject('shareData')!

const key = useVwToPx(1)
const total = toRef(() => shareData.mainData.totalRepayAmt)
</script>

<template>
  <div class="refund_total_wrapper align-center absolute flex">
    <DotLottieVue
      :key="key"
      class="icon absolute"
      autoplay
      loop
      :data="refund_gather"
    ></DotLottieVue>
    累计回款：{{ formatNumber(total) }}元
  </div>
</template>

<style scoped>
.refund_total_wrapper {
  top: 8vw;
  left: 42%;
  font-size: 1.6rem;
  transform: translateX(-50%);
}

.icon {
  top: 38%;
  left: -2.5vw;
  width: 10vw;
  transform: translate(-50%, -50%);
}
</style>
