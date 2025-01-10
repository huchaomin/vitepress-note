<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 15:32:32
 * @Description  :
-->
<script setup lang="ts">
import refund_gather from '@/pages/bigScreen/assets/json/lottie/refund_gather.json?raw'
import { repayItemChangeKey } from '@/pages/bigScreen/utils/others'
import { DotLottieVue, type DotLottieVueInstance } from '@lottiefiles/dotlottie-vue'

const shareData: Record<string, any> = inject('shareData')!
const initialTotal = computed(() => {
  return (
    shareData.mainData.totalRepayAmt +
    shareData.mainData.totalDiscountAmt -
    shareData.repayDataList.reduce((acc: number, item: any) => {
      return acc + item.repayAmt
    }, 0)
  )
})

const repayItemIndex = ref(0)
const bus = useEventBus(repayItemChangeKey)
bus.on(({ index }) => {
  repayItemIndex.value = index
})

const startEnd = reactive<[] | [number, number]>([])
shareData.refundTotalStartEnd = startEnd
watchEffect(() => {
  if (repayItemIndex.value === 0) {
    startEnd[0] = 0
    startEnd[1] = initialTotal.value
  } else {
    const item = shareData.repayDataList[repayItemIndex.value]
    startEnd[0] = startEnd[1]
    startEnd[1] = startEnd[0] + item.repayAmt
  }
})

const dotLottieVueRef = ref<DotLottieVueInstance | null>(null)

const numberAnimationActive = ref(false)
watch(startEnd, (arr) => {
  if (arr[0] !== arr[1]) {
    numberAnimationActive.value = true
    const instance = dotLottieVueRef.value?.getDotLottieInstance()
    if (instance) {
      instance.play()
    }
  }
})

onMounted(() => {
  const instance = dotLottieVueRef.value!.getDotLottieInstance()
  instance!.addEventListener('complete', () => {
    instance!.play()
    setTimeout(() => {
      instance!.pause()
    }, 2000)
  })
})
</script>

<template>
  <div class="refund_total_wrapper align-center absolute flex">
    <DotLottieVue
      ref="dotLottieVueRef"
      :render-config="{
        autoResize: true,
      }"
      :speed="2"
      class="icon absolute"
      :data="refund_gather"
    ></DotLottieVue>
    化债总额：
    <NNumberAnimation
      :from="startEnd[0]"
      :to="startEnd[1]"
      :active="numberAnimationActive"
      :precision="2"
      :duration="3800"
      show-separator
    ></NNumberAnimation>
    元
  </div>
</template>

<style scoped>
.refund_total_wrapper {
  font-size: 1.3vw;
  opacity: 0;
  transform: translateY(1.67vw);
}

.icon {
  top: 38%;
  left: -2.5vw;
  width: 10vw;
  transform: translate(-50%, -50%);
}
</style>
