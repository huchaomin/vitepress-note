<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 09:22:48
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 11:17:44
 * @Description  :
-->
<script setup lang="ts">
import SvgLineAnimation from './SvgLineAnimation.vue'
import { colors } from '@/pages/index/utils/others'
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
    <div class="bottom_menu flex">
      <NButton :bordered="false" :color="colors.white" ghost class="is_active"
        >智能数据大屏</NButton
      >
      <NButton :bordered="false" :color="colors.white" ghost>业务板块</NButton>
      <NButton :bordered="false" :color="colors.white" ghost>核心亮点</NButton>
    </div>
  </div>
</template>

<style scoped>
.footer_wrapper {
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 5vw;
  background: url('@/pages/index/assets/img/bottom_bg.png') 0 -0.4vw no-repeat;
  background-size: contain;
  opacity: 0;
  transform: translateY(100%);

  .line_left,
  .line_right {
    position: absolute;
    bottom: -0.42vw;
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

  .bottom_menu {
    gap: 0 1vw;

    .n-button {
      --n-height: 2.5vw;
      --n-font-size: 1.2rem;

      min-width: calc(var(--n-height) * 200 / 64);
      background: url('@/pages/index/assets/img/bottom_btn.png') no-repeat;
      background-size: 100%;

      :deep() {
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgb(117 232 255 / 100%), rgb(255 255 255 / 100%));
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      &:hover,
      &.is_active {
        background: url('@/pages/index/assets/img/bottom_btn_hover.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
