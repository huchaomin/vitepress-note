<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-25 18:15:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-28 00:20:59
 * @Description  :
-->
<script setup lang="ts">
import StreamerBorder from './StreamerBorder.vue'
import ScrollItem from './ScrollItem.vue'

const scrollWrapperRef = ref<HTMLDivElement | null>(null)

const { height } = useElementSize(scrollWrapperRef)

// 创建一个长度为 4 的数组
const scrollItems = Array.from({ length: 4 }, (_, index) => index).map(() => ({
  amount: 1000,
  key: Math.random(),
  name: '张三*姐',
  time: '2024-10-27',
}))

console.log('scrollItems', scrollItems)

</script>

<template>
  <div class="refund_scroll_wrapper absolute h-full">
    <StreamerBorder style="padding: 1vw 0.5vw;" class="flex flex-col h-full">
      <div class="ml-9" style="font-size: 1.2rem;">回款实时监控</div>
      <div ref="scrollWrapperRef" class="mt-4 flex-1 overflow-hidden">
        <ScrollItem
          v-for="(item, index) in scrollItems"
          :key="item.key"
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
  right: 24vw;
  bottom: 8vw;
  width: 12.5vw;
  height: 20vw;
  color: var(--color-white);
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
}
</style>
