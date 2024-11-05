<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-05 16:07:24
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import assets_gather from '@/pages/index/assets/json/lottie/assets_gather.json?url'

const key = useVwToPx(1)
const total = ref('9234723234234')
</script>

<template>
  <div class="refund_total_wrapper absolute flex align-center">
    <DotLottieVue :key="key" class="icon absolute" autoplay loop :src="assets_gather"></DotLottieVue>
    累计回款：{{ numeral(total).format('0,0.[00]') }} 元
  </div>
</template>

<style scoped>
  .refund_total_wrapper {
    top: 8vw;
    left: 50%;
    font-size: 2rem;
    transform: translateX(-50%);
  }

  .icon {
    top: 40%;
    left: -2.5vw;
    width: 12vw;
    transform: translate(-50%, -50%);
  }
</style>
