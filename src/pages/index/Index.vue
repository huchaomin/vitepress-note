<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-27 10:13:34
 * @Description  :
-->
<script setup lang="ts">
import { getMainData, getRepayList } from '@/api/bigScreen'
import { colors } from '@/pages/index/utils/others'
import {
  cameraPositionReadyKey,
  cameraPositionStartKey,
  carouselIndexChangeKey,
  type ItemType,
  repayItemChangeKey,
} from '@/pages/index/utils/others'
import gsap from 'gsap'

import FooterBar from './component/footer/Index.vue'
import HeaderBar from './component/header/Index.vue'
import Page1 from './component/page1/Index.vue'
import Page2 from './component/page2/Index.vue'
import Page3 from './component/page3/Index.vue'
import CanvasRender from './index'

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

const { data: repayDataList, send: repaySend } = useRequest(getRepayList, {
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
shareData.repayDataList = repayDataList
provide('shareData', shareData)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const carouselIndexChangeBus = useEventBus(carouselIndexChangeKey)

onMounted(() => {
  const instance = new CanvasRender(canvasRef.value!)
  carouselIndexChangeBus.on((index) => {
    instance.mapSceneGroup.visible = index === 0
    if (index !== 0) {
      instance.camera.controls.reset()
    }
  })
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

const bottomBtnText = ['智能数据大屏', '业务模式', '核心亮点']

const carouselIndex = ref(0)
function handleCarouselIndexChange(index: number) {
  carouselIndex.value = index
  carouselIndexChangeBus.emit(index)
}
</script>

<template>
  <div class="big_screen_root h-screen w-screen">
    <div style="aspect-ratio: 16/9;">
      <div class="canvas_parent relative h-full w-full overflow-hidden">
        <HeaderBar ref="headerBarRef"></HeaderBar>
        <canvas ref="canvasRef"></canvas>
        <div
          ref="bottomBgRef"
          :style="{
            visibility: carouselIndex === 0 ? 'visible' : 'hidden',
          }"
          class="bottom_bg absolute w-full"
        >
          <div class="bottom_bg_inner absolute"></div>
        </div>
        <FooterBar ref="footerBarRef"></FooterBar>
        <NCarousel effect="fade" :on-update:current-index="handleCarouselIndexChange">
          <Page1></Page1>
          <Page2
            :class="{
              active: carouselIndex === 1,
            }"
          ></Page2>
          <Page3
            :class="{
              active: carouselIndex === 2,
            }"
          ></Page3>
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
.big_screen_root {
  font-size: 0.83vw;

  /* Spacing */
  /* stylelint-disable custom-property-pattern */
  --spacing-px: 1px;
  --spacing-0: 0px;
  --spacing-0_5: 0.125vw;
  --spacing-1: 0.25vw;
  --spacing-1_5: 0.375vw;
  --spacing-2: 0.5vw;
  --spacing-2_5: 0.625vw;
  --spacing-3: 0.75vw;
  --spacing-3_5: 0.875vw;
  --spacing-4: 1vw;
  --spacing-5: 1.25vw;
  --spacing-6: 1.5vw;
  --spacing-7: 1.75vw;
  --spacing-8: 2vw;
  --spacing-9: 2.25vw;
  --spacing-10: 2.5vw;
  --spacing-11: 2.75vw;
  --spacing-12: 3vw;
  --spacing-14: 3.5vw;
  --spacing-16: 4vw;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

.bottom_bg {
  bottom: 0;
  left: 0;
  height: 5vw;
  pointer-events: none;
  opacity: 0;
  transform: translateY(100%);

  .bottom_bg_inner {
    top: 5vw;
    left: 50%;
    width: 250vw;
    height: 250vw;
    border-radius: 50%;
    box-shadow: 0 -4vw 2vw 2vw rgb(1 16 36 / 90%);
    transform: translateX(-50%);
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
    --n-font-size: 1vw;

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
    top: -2.55px;
    font-size: 16px;
    text-shadow: 1px 1px 0 #000;
    opacity: 0;
  }

  & :deep(.badges_label_wrapper) {
    font-size: 16px;
    opacity: 0;

    .badges_label {
      position: relative;
      bottom: 48px;
      padding: 10px 18px;
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
    }
  }

  & :deep(.arrow_down_icon_wrapper) {
    opacity: 0;

    .arrow_down_icon {
      position: relative;
      bottom: 8px;
      width: 16px;
      height: 16px;
    }
  }

  & :deep() {
    h3 {
      font-size: 1vw;
      letter-spacing: 0.21vw;
    }
  }
}
</style>
