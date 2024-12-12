<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-25 18:15:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 15:51:32
 * @Description  :
-->
<script setup lang="ts">
import gsap from 'gsap'
import StreamerBorder from './StreamerBorder.vue'
import ScrollItem from './ScrollItem.vue'
import autoAnimate from '@formkit/auto-animate'
import { repayItemChangeKey, type ItemType } from '@/pages/bigScreen/utils/others'

const { proxy } = getCurrentInstance()!
const scrollWrapperRef = ref<HTMLDivElement | null>(null)

const { height } = useElementSize(scrollWrapperRef)

const scrollItems = reactive<ItemType[]>([])
const bus = useEventBus(repayItemChangeKey)

let isViewReady = false
bus.on(({ arr, index }) => {
  if (index === 0 && scrollItems.length === 0) {
    scrollItems.push(...[arr[0], arr[arr.length - 1], arr[arr.length - 2], arr[arr.length - 3]])
  } else {
    scrollItems.unshift(arr[index])
    scrollItems.pop()
  }
  if (!isViewReady) {
    gsap.to(proxy!.$el, {
      duration: 1,
      ease: 'power2.out',
      opacity: 1,
      scale: 1,
      transformOrigin: 'top left',
    })
    isViewReady = true
  }
})

onMounted(() => {
  autoAnimate(scrollWrapperRef.value!)
})
</script>

<template>
  <div class="refund_scroll_wrapper absolute">
    <StreamerBorder style="padding: 1vw 0.3vw;" class="flex h-full flex-col">
      <h3 class="ml-8">回款实时监控</h3>
      <div ref="scrollWrapperRef" class="mt-2 flex-1 overflow-hidden">
        <ScrollItem
          v-for="(item, index) in scrollItems"
          :key="item.id"
          :item="item"
          :index="index"
          :style="{ height: `${height / 4}px` }"
        ></ScrollItem>
      </div>
    </StreamerBorder>
  </div>
</template>

<style scoped>
.refund_scroll_wrapper {
  right: 26vw;
  bottom: 10vw;
  width: 10.8vw;
  height: 18vw;
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
  opacity: 0;
  scale: 0;
}
</style>
