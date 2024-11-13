<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 11:14:30
 * @Description  :
-->
<script setup lang="ts">
import CanvasRender from './index'
import Page1 from './component/page1/Index.vue'
import HeaderBar from './component/header/Index.vue'
import FooterBar from './component/footer/Index.vue'
import { getMainData, getRepayList } from '@/api/bigScreen'
import { repayItemChangeKey, type ItemType } from '@/pages/index/utils/others'

const queryFlayMap = {
  next: {
    date: dayjs().format('YYYY-MM-DD'),
  },
  prev: {
    date: dayjs().format('YYYY-MM-DD'),
  },
}

const { data: mainData, send: mainSend } = useRequest(getMainData, {
  initialData: {},
}).onComplete(() => {
  queryFlayMap.prev.date = dayjs().format('YYYY-MM-DD')
})

const { data: repayDataList, send: repaySend } = useRequest(getRepayList(), {
  initialData: [],
}).onSuccess(() => {
  showCurrentRepayItem(30000)
})

const currentRepayIndex = ref(0)

const timer = setInterval(() => {
  queryFlayMap.next.date = dayjs().format('YYYY-MM-DD')
  if (queryFlayMap.next.date !== queryFlayMap.prev.date) {
    mainSend()
    repaySend()
    currentRepayIndex.value = 0
  }
}, 60000)

function getRandomDelay() {
  const min = 30
  const max = 60
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let timer2: NodeJS.Timeout | null
function showCurrentRepayItem(delay: number) {
  timer2 = setTimeout(() => {
    if (currentRepayIndex.value >= repayDataList.value.length) {
      currentRepayIndex.value = 0
    } else {
      currentRepayIndex.value++
    }
    showCurrentRepayItem(getRandomDelay() * 1000)
  }, delay)
}

onUnmounted(() => {
  clearInterval(timer)
  clearTimeout(timer2!)
})

const bus = useEventBus(repayItemChangeKey)

watch([currentRepayIndex, repayDataList as unknown as ItemType[]], ([index, arr]) => {
  bus.emit({
    arr,
    index,
  })
})

const shareData: Record<string, any> = reactive({})
shareData.mainData = mainData
provide('shareData', shareData)

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
    top: -0.177rem;
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
