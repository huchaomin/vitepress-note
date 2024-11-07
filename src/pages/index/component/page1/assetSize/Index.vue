<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 15:22:50
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import assets_size from '@/pages/index/assets/json/lottie/assets_size.json?url'
import border from '@/pages/index/assets/json/lottie/border.json?url'
import { formatNumber } from '@/utils/format'

const key = useVwToPx(1)
const total = ref(72234234234)
const totalSplitArr = computed(() => {
  return formatNumber(total.value, {
    notation: 'compact',
  }).split('')
})
</script>

<template>
  <div class="asset_size_wrapper absolute flex align-center">
    <DotLottieVue :key="key" class="icon absolute" autoplay loop :src="assets_size"></DotLottieVue>
    <span>资产规模：</span>
    <div v-for="(item, index) in totalSplitArr" :key="index" class="relative border_box">
      <DotLottieVue :key="key" class="absolute border_icon" autoplay loop :src="border"></DotLottieVue>
      <div class="inline-flex items-center justify-center">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
  .asset_size_wrapper {
    top: 6.2vw;
    font-size: 2.4rem;
  }

  .icon {
    top: 40%;
    left: -2.5vw;
    width: 14vw;
    transform: translate(-50%, -50%);
  }

  .border_box {
    width: 2.2vw;
    height: 2.2vw;
    margin-left: 0.3vw;

    .border_icon {
      top: 68%;
      left: 46%;
      width: 450%;
      transform: translate(-50%, -50%);
    }
  }

</style>
