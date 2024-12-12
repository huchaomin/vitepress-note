<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 18:03:18
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 11:23:08
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import title_underline from '@/pages/bigScreen/assets/json/lottie/title_underline.json?raw'

withDefaults(
  defineProps<{
    data: string
    title: string
  }>(),
  {},
)
</script>

<template>
  <div>
    <div class="-mb-3 flex items-center">
      <DotLottieVue
        :render-config="{
          autoResize: true,
        }"
        style="width: 3vw; height: 3vw;"
        autoplay
        loop
        :data="data"
      ></DotLottieVue>
      <h3 class="ml-2">{{ title }}</h3>
    </div>
    <DotLottieVue
      :render-config="{
        autoResize: true,
      }"
      mode="bounce"
      style="height: 1.5vw;"
      autoplay
      loop
      :data="title_underline"
    ></DotLottieVue>
  </div>
</template>
