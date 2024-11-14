<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 16:07:36
 * @Description  :
-->
<script setup lang="ts">
import gsap from 'gsap'
import CanvasRender from './index'
import Page1 from './component/page1/Index.vue'
import Page2 from './component/page2/Index.vue'
import Page3 from './component/page3/Index.vue'
import HeaderBar from './component/header/Index.vue'
import FooterBar from './component/footer/Index.vue'
import { getMainData, getRepayList } from '@/api/bigScreen'
import { colors } from '@/pages/index/utils/others'
import {
  repayItemChangeKey,
  cameraPositionReadyKey,
  cameraPositionStartKey,
  type ItemType,
} from '@/pages/index/utils/others'

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
    debugger
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

const repayItemChangeBus = useEventBus(repayItemChangeKey)

const cameraPositionReady = ref(false)
const cameraPositionReadyBus = useEventBus(cameraPositionReadyKey)
cameraPositionReadyBus.on(() => {
  cameraPositionReady.value = true
})

watch(
  [currentRepayIndex, repayDataList as unknown as ItemType[], cameraPositionReady],
  ([index, arr, cameraPositionReady]) => {
    if (cameraPositionReady) {
      repayItemChangeBus.emit({
        arr,
        index,
      })
    }
  },
)

const shareData: Record<string, any> = reactive({})
shareData.mainData = mainData
provide('shareData', shareData)

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line no-new
  new CanvasRender(canvasRef.value!)
})

const cameraPositionStartBus = useEventBus(cameraPositionStartKey)
const headerBarRef = ref<InstanceType<typeof HeaderBar> | null>(null)
const footerBarRef = ref<InstanceType<typeof FooterBar> | null>(null)
const bottomMenuRef = ref<HTMLDivElement | null>(null)
const bottomBgRef = ref<HTMLDivElement | null>(null)

cameraPositionStartBus.on(() => {
  cameraPositionStartBus.on(() => {
    const tl = gsap.timeline()
    tl.addLabel('header_footer', 4)
    tl.add(
      gsap.to(footerBarRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'header_footer',
    )
    tl.add(
      gsap.to(headerBarRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'header_footer',
    )
    tl.add(
      gsap.to(bottomMenuRef.value, {
        duration: 2,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'header_footer',
    )
    tl.add(
      gsap.to(bottomBgRef.value, {
        duration: 2,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'header_footer',
    )
  })
})

const bottomBtnText = ['智能数据大屏', '业务板块', '核心亮点']

const carouselIndex = ref(0)
function handleCarouselIndexChange(index: number) {
  carouselIndex.value = index
}
</script>

<template>
  <div class="h-screen w-screen">
    <div style="aspect-ratio: 16/9;">
      <div class="canvas_parent relative h-full w-full overflow-hidden">
        <HeaderBar ref="headerBarRef"></HeaderBar>
        <canvas ref="canvasRef"></canvas>
        <div
          ref="bottomBgRef"
          :style="{
            visibility: carouselIndex === 0 ? 'visible' : 'hidden',
          }"
          class="bottom_bg absolute flex w-full justify-center"
        >
          <div class="bottom_bg_inner"></div>
        </div>
        <FooterBar ref="footerBarRef"></FooterBar>
        <NCarousel effect="fade" :on-update:current-index="handleCarouselIndexChange">
          <Page1></Page1>
          <Page2></Page2>
          <Page3></Page3>
          <template #dots="{ total, currentIndex, to }">
            <div ref="bottomMenuRef" class="bottom_menu absolute flex w-full justify-center">
              <NButton
                v-for="index of total"
                :key="index"
                :class="{ ['is_active']: currentIndex === index - 1 }"
                :bordered="false"
                :color="colors.white"
                ghost
                @click="to(index - 1)"
                >{{ bottomBtnText[index - 1] }}</NButton
              >
            </div>
          </template>
        </NCarousel>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}

.bottom_bg {
  bottom: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  transform: translateY(100%);

  .bottom_bg_inner {
    width: 50vw;
    height: 10vw;
    box-shadow: inset 0 -7vw 1.7544vw rgb(1 16 36 / 90%);
  }
}

.n-carousel {
  position: absolute !important;
  top: 0;
  left: 0;
  pointer-events: none;

  :deep() {
    .n-carousel__slide {
      pointer-events: none !important;
    }
  }
}

.bottom_menu {
  bottom: 2vw;
  gap: 0 1vw;
  opacity: 0;
  transform: translateY(100%);

  .n-button {
    --n-height: 2.5vw;
    --n-font-size: 1.2rem;

    min-width: calc(var(--n-height) * 200 / 64);
    pointer-events: auto;
    background: url('@/pages/index/assets/img/bottom_btn.png') no-repeat;
    background-size: 100%;

    :deep() {
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgb(117 232 255 / 100%), rgb(255 255 255 / 100%));
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &:hover,
    &.is_active {
      background: url('@/pages/index/assets/img/bottom_btn_hover.png') no-repeat;
      background-size: 100%;
    }
  }
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
