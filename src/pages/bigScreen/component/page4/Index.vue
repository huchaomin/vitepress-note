<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2025-01-09 15:47:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-10 11:42:07
 * @Description  :
-->
<script setup lang="ts">
import screen from '@/pages/bigScreen/assets/json/lottie/screen.json?raw'
import videoUrl from '@/pages/bigScreen/assets/video/智能法诉产品.mp4?url'
import { DotLottieVue, type DotLottieVueInstance } from '@lottiefiles/dotlottie-vue'
import Artplayer from 'artplayer'

const dotLottieVueRef = ref<DotLottieVueInstance | null>(null)
const videoContainerRef = ref<HTMLDivElement | null>(null)

const artInstance = ref<Artplayer | null>(null)
onMounted(() => {
  artInstance.value = new Artplayer({
    autoSize: true,
    container: videoContainerRef.value!,
    fullscreen: true,
    url: videoUrl,
  })
})

onUnmounted(() => {
  artInstance.value!.destroy(false)
})
</script>

<template>
  <div class="page4_wrapper relative flex h-full w-full items-center justify-center">
    <DotLottieVue
      ref="dotLottieVueRef"
      class="canvas_container absolute"
      style="opacity: 0.5;"
      :render-config="{
        autoResize: true,
      }"
      autoplay
      loop
      :data="screen"
    ></DotLottieVue>
    <div ref="videoContainerRef" class="video_container"></div>
  </div>
</template>

<style scoped>
.page4_wrapper {
  &.active {
    pointer-events: auto;
  }
}

.canvas_container {
  top: 0;
  width: 135%;
  transform: translateX(-0.32%);
}

.video_container {
  width: 64%;
  height: 59%;
  transform: translateY(-10.8%);
}
</style>
