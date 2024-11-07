<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 11:27:59
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import refund_gather from '@/pages/index/assets/json/lottie/refund_gather.json?url'
import { formatNumber } from '@/utils/format'

const key = useVwToPx(1)
const total = ref(34723234234.40)
</script>

<template>
  <div class="refund_total_wrapper absolute flex align-center">
    <DotLottieVue :key="key" class="icon absolute" autoplay loop :src="refund_gather"></DotLottieVue>
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
