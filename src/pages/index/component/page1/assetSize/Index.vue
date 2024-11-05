<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-05 18:58:59
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import assets_size from '@/pages/index/assets/json/lottie/assets_size.json?url'
import { formatNumber } from '@/utils/format'

const key = useVwToPx(1)
const total = ref(72234234234)
</script>

<template>
  <div class="asset_size_wrapper absolute flex align-center">
    <DotLottieVue :key="key" class="icon absolute" autoplay loop :src="assets_size"></DotLottieVue>
    资产规模：{{ formatNumber(total, {
      notation: 'compact'
    }) }}元
  </div>
</template>

<style scoped>
  .asset_size_wrapper {
    top: 4vw;
    right: 2vw;
    font-size: 2.4rem;
  }

  .icon {
    top: 40%;
    left: -2.5vw;
    width: 14vw;
    transform: translate(-50%, -50%);
  }
</style>
