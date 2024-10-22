<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 11:19:17
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './index';

const rootRef = ref<HTMLDivElement | null>(null)
const { height, width } = useElementSize(rootRef)

const ratio = '16/9'

const classStr = computed(() => {
  const [w, h] = ratio.split('/').map(Number)
  if (height.value > (width.value * h) / w) {
    return 'w-full'
  } else {
    return 'h-full'
  }
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  new CanvasRender(canvasRef.value!, {
    geoProjectionCenter:[108.55, 34.32],
  })
})

</script>

<template>
  <div ref="rootRef" class="flex h-screen w-screen items-center justify-center">
    <div :class="classStr" :style="{ aspectRatio: ratio }">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>
<style scoped>
  canvas {
    width: 100% !important;
    height: 100% !important
  }
</style>
