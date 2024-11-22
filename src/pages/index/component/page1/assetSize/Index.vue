<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 15:31:49
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import assets_size from '@/pages/index/assets/json/lottie/assets_size.json?raw'
import border from '@/pages/index/assets/json/lottie/border.json?raw'
import { formatNumber } from '@/utils/format'

const shareData: Record<string, any> = inject('shareData')!

const total = toRef(() => shareData.mainData.orgTotalAmt)
const totalSplitArr = computed(() => {
  return formatNumber(total.value, {
    notation: 'compact',
  }).split('')
})
</script>

<template>
  <div class="asset_size_wrapper align-center absolute flex">
    <DotLottieVue
      :render-config="{
        autoResize: true,
      }"
      class="icon absolute"
      autoplay
      loop
      :data="assets_size"
    ></DotLottieVue>
    <span>资产规模：</span>
    <div v-for="(item, index) in totalSplitArr" :key="index" class="border_box relative">
      <DotLottieVue
        :render-config="{
          autoResize: true,
        }"
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
  opacity: 0;
  transform: translateY(-1.67vw);
}

.icon {
  top: 40%;
  left: -2.5vw;
  width: 14vw;
  transform: translate(-50%, -50%);
}

.border_box {
  width: 2.1vw;
  height: 2.1vw;
  margin-left: 0.3vw;

  .border_icon {
    top: 60%;
    left: 39%;
    width: 450%;
    transform: translate(-50%, -50%);
  }
}
</style>
