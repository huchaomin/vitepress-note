<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 09:31:32
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './CanvasRender';

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
      <canvas class="h-full" ref="canvasRef"></canvas>
    </div>
  </div>
</template>
