<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-30 17:15:06
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './index'
import Page1 from './component/page1/Index.vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line no-new
  new CanvasRender(canvasRef.value!, {
    geoProjectionCenter: [108.55, 34.32],
  })
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

  & :deep(.provinces_name_label) {
    top: -2px;
    font-size: 16px;
    color: #fff;
    text-shadow: 1px 1px 0 #000;
    opacity: 0;
  }

  & :deep(.badges_label_wrap) {
    font-size: 16px;
    opacity: 1;

    .badges_label {
      position: relative;
      bottom: 48px;
      padding: 10px;
      font-weight: bold;
      color: #fff;
      background: #0e1937;
      border: 1px solid #1e7491;

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

      .icon_wrapper {
        position: absolute;
        bottom: -18px;
        left: 50%;
        transform: translateX(-50%);
      }

      .icon {
        width: 20px;
        height: 18px;

        /* 不能有 transform 动画， 会造成标签模糊 */

        /* transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 1);
        animation: 3.5s linear 0s infinite normal forwards running wander;
        transform-box: view-box; */
      }
    }
  }
}
</style>
