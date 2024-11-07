<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-06 13:55:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 16:29:51
 * @Description  : slideToClickedSlide 不能和 loop 一起使用
-->
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import InnerBtn from './Btn.vue'

const btnArr: Array<{
  pageIndex: number
  text: string
}> = [
  {
    pageIndex: 0,
    text: '智能数据大屏',
  },
  {
    pageIndex: 1,
    text: '业务板块',
  },
  {
    pageIndex: 2,
    text: '核心亮点',
  },
]

</script>

<template>
  <div class="swiper_btns_wrapper">
    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="3"
      :autoplay="{ delay: 100000000, pauseOnMouseEnter: true }"
      loop
      centered-slides
      :allow-touch-move="false"
    >
    <template v-for="(item, index) of [...btnArr,...btnArr]" :key="index">
      <SwiperSlide v-slot="{ isActive,isNext,isPrev  }" >
        <InnerBtn :is-active="isActive" :is-next="isNext" :is-prev="isPrev" v-bind="item"></InnerBtn>
      </SwiperSlide>
    </template>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper_btns_wrapper {
  :deep() {
    .n-button {
      --n-padding: 2rem 0;
      --n-width: 100%;

      font-size: 1.6rem;

      /* background: linear-gradient(to bottom, rgb(0 72 203 / 10%), rgb(14 195 255 / 20%)); */
      background: rgb(12 66 105 / 45%);
      backdrop-filter: blur(7.5px);
    }
  }
}

.swiper {
  transform: perspective(4rem) rotateX(13deg);
  transform-origin: bottom;
}
</style>
