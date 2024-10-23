<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 18:29:09
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
      <div class="w-full h-full relative">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </div>
</template>
<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important
}

/* stylelint-disable-next-line selector-class-pattern */
:deep(.provinces-name-label-wrap) {
  color: #a6d7e2;
  text-shadow: 1px 1px 0 #000;
  opacity: 0
}

:deep(.badges-label) {
  z-index: 99999;

  &-outline {
    position: absolute
  }

  &-wrap {
    position: relative;
    bottom: 50px;
    z-index: 99999;
    padding: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background: #0e1937;
    border: 1px solid #1e7491;

    span {
      color: #ffe70b
    }

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
      width: 10px;
      height: 10px;
      content: "";
      border-right: 2px solid #6cfffe;
      border-bottom: 2px solid #6cfffe
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 10px;
      height: 10px;
      content: "";
      border-top: 2px solid #6cfffe;
      border-left: 2px solid #6cfffe
    }

    .icon {
      position: absolute;
      bottom: -40px;
      left: 50%;
      width: 27px;
      height: 20px;
      transform: translateX(-13px)
    }
  }
}

</style>
