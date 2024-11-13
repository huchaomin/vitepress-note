<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-06 10:59:39
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 15:07:59
 * @Description  :
-->
<script setup lang="ts">
import footerSvg from '@/pages/index/assets/svg/footer.svg?raw'
import SwiperBtns from './swiperBtns/Index.vue'
</script>

<script setup lang="ts"></script>

<template>
  <div class="footer_wrapper absolute flex flex-col items-center">
    <div class="top relative">
      <SwiperBtns></SwiperBtns>
      <div class="gap"></div>
    </div>
    <div class="img" v-html="footerSvg"></div>
  </div>
</template>

<style scoped>
.footer_wrapper {
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  opacity: 0;
  transform: translateY(100%);
}

.top {
  top: 2vw;
  z-index: -1;
  width: 38%;
}

.gap {
  height: 2.8vw;
  background: rgb(12 66 105 / 45%);
  backdrop-filter: blur(7.5px);
  border-radius: 2px;
  box-shadow: 0 8px 32px rgb(31 38 135 / 37%);
}

.img {
  width: 80%;
}
</style>
