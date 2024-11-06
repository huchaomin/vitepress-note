<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-06 16:06:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-06 17:56:31
 * @Description  : swiper.slideTo 好像不能和 loop 一起使用
-->
<script setup lang="ts">
import { colors } from '../../utils/others'
import { useSwiper } from 'swiper/vue'

const props = withDefaults(
  defineProps<{
    isActive: boolean
    isNext: boolean
    isPrev: boolean
    pageIndex: number
    text: string
  }>(),
  {
  },
)

const swiper = useSwiper()

function swiperTo() {
  if (props.isActive) {
    return
  }
  if (props.isPrev) {
    swiper.value.slidePrev()
  } else {
    swiper.value.slideNext()
  }
}

</script>

<template>
  <NButton ghost :color="isActive ? colors.white : colors.blueHover" @click="swiperTo">
    <span
class="text"
:class="{
      isNext,
      isPrev,
    }">
      {{ text }}
    </span>
  </NButton>
</template>

<style scoped>
  .text {
    transform: perspective(9rem) rotateX(-28deg);
    transform-origin: bottom;

    &.isNext {
      transform: perspective(9rem) rotateX(-34deg) skewX(-26deg);
    }

    &.isPrev {
      transform: perspective(9rem) rotateX(-34deg) skewX(26deg);
    }
  }
</style>
