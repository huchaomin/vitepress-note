<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 22:14:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-27 00:20:34
 * @Description  :
-->
<script setup lang="ts">
import triangleDancing from '@/assets/svg/triangle_dancing.svg?raw'
import { colors } from '@/pages/index/utils/others'

const triangleDancingStr = computed(() => {
  return triangleDancing.replace(': white', `: ${colors.yellow}`)
})
</script>

<template>
  <div class="flex items-start">
    <div class="arrow" v-html="triangleDancingStr"></div>
    <div>
      <div>
        <span>2024-10-26</span>
        <span class="ml-3_5">何*洁</span>
      </div>
      <div>回款：1500.00</div>
    </div>
  </div>
</template>

<style scoped>
.arrow {
  position: relative;

  /* right: 0.4vw; */
  width: 2.5vw;
  height: 2.5vw;
}
</style>
