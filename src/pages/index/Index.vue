<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-09 23:32:37
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './index'
import Page1 from './component/page1/Index.vue'
import HeaderBar from './component/header/Index.vue'
import FooterBar from './component/footer/Index.vue'
import { getMainData } from '@/api/bigScreen'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line no-new
  new CanvasRender(canvasRef.value!)
})

const { data, loading } = useRequest(getMainData, {
  initialData: {},
})

</script>

<template>
  <div class="h-screen w-screen">
    <div style="aspect-ratio: 16/9;">
      <div class="canvas_parent relative h-full w-full">
        <canvas ref="canvasRef"></canvas>
        <HeaderBar></HeaderBar>
        <Page1></Page1>
        <FooterBar></FooterBar>
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

  color: var(--color-white);

  & :deep(.provinces_name) {
    top: -0.1563rem;
    font-size: 0.8rem;
    text-shadow: 1px 1px 0 #000;
    opacity: 0;
  }

  & :deep(.badges_label_wrapper) {
    opacity: 0;

    .badges_label {
      position: relative;
      bottom: 3rem;
      padding: 0.5rem;
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
        width: 0.625rem;
        height: 0.625rem;
        content: '';
        border-right: 0.125rem solid #6cfffe;
        border-bottom: 0.125rem solid #6cfffe;
      }

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 0.625rem;
        height: 0.625rem;
        content: '';
        border-top: 0.125rem solid #6cfffe;
        border-left: 0.125rem solid #6cfffe;
      }
    }
  }

  & :deep(.arrow_down_icon_wrapper) {
    opacity: 0;

    .arrow_down_icon {
      position: relative;
      bottom: 0.5rem;
      width: 1rem;
      height: 1rem;
    }
  }

  & :deep() {
    h3 {
      font-size: 1.2rem;
      letter-spacing: 0.25rem;
    }
  }
}
</style>
