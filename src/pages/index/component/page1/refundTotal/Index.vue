<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 14:42:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 10:57:07
 * @Description  :
-->
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import refund_gather from '@/pages/index/assets/json/lottie/refund_gather.json?raw'
import { repayItemChangeKey } from '@/pages/index/utils/others'

const shareData: Record<string, any> = inject('shareData')!
const initialTotal = computed(() => {
  return (
    shareData.mainData.totalRepayAmt -
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
const numberAnimationActive = ref(false)
watch(startEnd, (arr) => {
  numberAnimationActive.value = arr[0] !== arr[1]
})

const key = useVwToPx(1)
</script>

<template>
  <div class="refund_total_wrapper align-center absolute flex">
    <DotLottieVue
      :key="key"
      class="icon absolute"
      autoplay
      loop
      :data="refund_gather"
    ></DotLottieVue>
    累计回款：
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
  top: 8vw;
  left: 42%;
  font-size: 1.6rem;
  opacity: 0;
  transform: translate(-50%, 2rem);
}

.icon {
  top: 38%;
  left: -2.5vw;
  width: 10vw;
  transform: translate(-50%, -50%);
}
</style>
