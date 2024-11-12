<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-25 18:15:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-12 17:50:03
 * @Description  :
-->
<script setup lang="ts">
import StreamerBorder from './StreamerBorder.vue'
import ScrollItem from './ScrollItem.vue'
import autoAnimate from '@formkit/auto-animate'

const scrollWrapperRef = ref<HTMLDivElement | null>(null)

const { height } = useElementSize(scrollWrapperRef)

const shareData: Record<string, any> = inject('shareData')!

export interface ItemType {
  clientName: string
  repayAmt: number
  userId: string
}

const scrollItems = reactive<ItemType[]>([])

watch(
  [() => shareData.currentRepayIndex, () => shareData.repayDataList],
  ([index, arr]) => {
    if (arr.length === 0) {
      return
    }
    if (index === 0 && scrollItems.length === 0) {
      scrollItems.push(...[arr[0], arr[arr.length - 1], arr[arr.length - 2], arr[arr.length - 3]])
    } else {
      scrollItems.unshift(arr[index])
      scrollItems.pop()
    }
  },
  { immediate: true },
)

onMounted(() => {
  autoAnimate(scrollWrapperRef.value!)
})
</script>

<template>
  <div class="refund_scroll_wrapper absolute">
    <StreamerBorder style="padding: 1vw 0.3vw;" class="flex h-full flex-col">
      <h3 class="ml-9">回款实时监控</h3>
      <div ref="scrollWrapperRef" class="mt-2 flex-1 overflow-hidden">
        <ScrollItem
          v-for="(item, index) in scrollItems"
          :key="item.userId"
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
  right: 27vw;
  bottom: 10.2vw;
  width: 10.8vw;
  height: 18vw;
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
}
</style>
