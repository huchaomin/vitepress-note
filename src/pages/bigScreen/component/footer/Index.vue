<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 09:22:48
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-14 23:44:13
 * @Description  :
-->
<script setup lang="ts">
import { colors } from '@/pages/bigScreen/utils/others'

import SvgLineAnimation from './SvgLineAnimation.vue'
</script>

<template>
  <div class="footer_wrapper absolute flex justify-center">
    <SvgLineAnimation
      class="line_left"
      :width="721"
      :height="57"
      :color="colors.lineHover"
      :stroke-width="3"
      :dir="[0, 1]"
      :length="50"
      path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
    ></SvgLineAnimation>
    <SvgLineAnimation
      class="line_left line_right"
      :width="721"
      :height="57"
      :color="colors.lineHover"
      :stroke-width="3"
      :dir="[0, 1]"
      :length="50"
      path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
    ></SvgLineAnimation>
  </div>
</template>

<style scoped>
.footer_wrapper {
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100vw * 180 / 3840);
  pointer-events: none;
  background: url('@/pages/bigScreen/assets/img/bottom_bg.png') 0 no-repeat;
  background-size: contain;
  opacity: 0;
  transform: translateY(100%);

  .line_left,
  .line_right {
    position: absolute;
    bottom: -1.12vw;
    width: 37vw;
    height: 2.97vw;
  }

  .line_left {
    right: 50%;
  }

  .line_right {
    left: 50%;
    transform: scaleX(-1);
  }
}
</style>
