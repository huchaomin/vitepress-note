<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 10:01:26
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './index'
import Page1 from './component/page1/Index.vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line no-new
  new CanvasRender(canvasRef.value!)
})
</script>

<template>
  <div class="h-screen w-screen">
    <div style="aspect-ratio: 16/9;">
      <div class="canvas_parent relative h-full w-full">
        <canvas ref="canvasRef"></canvas>
        <Page1></Page1>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}

.canvas_parent {
  --color-line: #0c4269;
  --color-line-hover: #00ced1;

  & :deep(.provinces_name) {
    top: -2px;
    color: #fff;
    text-shadow: 1px 1px 0 #000;
    opacity: 0;
  }

  & :deep(.badges_label) {
    position: relative;
    bottom: 48px;
    padding: 10px;
    color: #fff;
    background: #0e1937;
    border: 1px solid #1e7491;
    opacity: 1;

    .amt {
      color: var(--color-yellow);
    }

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
      width: 10px;
      height: 10px;
      content: '';
      border-right: 2px solid #6cfffe;
      border-bottom: 2px solid #6cfffe;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 10px;
      height: 10px;
      content: '';
      border-top: 2px solid #6cfffe;
      border-left: 2px solid #6cfffe;
    }
  }
}
</style>
