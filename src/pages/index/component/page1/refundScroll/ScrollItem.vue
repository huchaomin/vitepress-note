<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 22:14:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 15:51:51
 * @Description  :
-->
<script setup lang="ts">
import type { ItemType } from '@/pages/index/utils/others'

withDefaults(
  defineProps<{
    index: number
    item: ItemType
  }>(),
  {},
)

const time = ref(dayjs().format('HH:mm:ss'))
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-start">
      <i-line-md:play-filled
        class="arrow mr-2"
        :class="{
          'text-yellow': index === 0,
        }"
        :style="{
          animation:
            index === 0 ? '2s linear -0.625s infinite normal forwards running breath' : 'none',
        }"
      ></i-line-md:play-filled>
      <div>
        <div>
          <span>{{ time }}</span>
          <span class="ml-3">{{ item.clientName }}</span>
        </div>
        <div class="mt-1_5">
          回款:
          <span
            :class="{
              'text-yellow': index === 0,
            }"
          >
            {{ item.repayAmt }}
          </span>
          元
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrow {
  position: relative;
  bottom: 0.1vw;
  font-size: 1.25vw;
}
</style>
