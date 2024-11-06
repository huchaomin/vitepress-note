<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 18:03:18
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 18:10:08
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import title_underline from '@/pages/index/assets/json/lottie/title_underline.json?url'

withDefaults(
  defineProps<{
    src: string
    title: string
  }>(),
  {},
)

const key = useVwToPx(1)

</script>

<template>
  <div>
      <div class="flex items-center -mb-3">
        <DotLottieVue :key="key" style="width: 3vw; height: 3vw;" autoplay loop :src="src"></DotLottieVue>
        <h3 class="ml-2">{{ title }}</h3>
      </div>
      <DotLottieVue :key="key" mode="bounce" style="height: 1.5vw;" autoplay loop :src="title_underline"></DotLottieVue>
    </div>
</template>
