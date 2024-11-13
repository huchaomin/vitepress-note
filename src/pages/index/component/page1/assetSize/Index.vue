<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 14:56:35
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import assets_size from '@/pages/index/assets/json/lottie/assets_size.json?raw'
import border from '@/pages/index/assets/json/lottie/border.json?raw'
import { formatNumber } from '@/utils/format'

const shareData: Record<string, any> = inject('shareData')!

const key = useVwToPx(1)
const total = toRef(() => shareData.mainData.orgTotalAmt)
const totalSplitArr = computed(() => {
  return formatNumber(total.value, {
    notation: 'compact',
  }).split('')
})
</script>

<template>
  <div class="asset_size_wrapper align-center absolute flex">
    <DotLottieVue :key="key" class="icon absolute" autoplay loop :data="assets_size"></DotLottieVue>
    <span>资产规模：</span>
    <div v-for="(item, index) in totalSplitArr" :key="index" class="border_box relative">
      <DotLottieVue
        :key="key"
        class="border_icon absolute"
        autoplay
        loop
        :data="border"
      ></DotLottieVue>
      <div class="inline-flex items-center justify-center">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.asset_size_wrapper {
  top: 6.2vw;
  font-size: 2.4rem;
  opacity: 0;
  transform: translateY(-2rem);
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
