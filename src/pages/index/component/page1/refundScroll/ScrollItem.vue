<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 22:14:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 10:10:36
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
        :style="{
          color: `var(${index === 0 ? '--color-yellow' : '--color-white'})`,
          animation:
            index === 0 ? '2s linear -0.625s infinite normal forwards running breath' : 'none',
        }"
      ></i-line-md:play-filled>
      <div>
        <div>
          <span>{{ time }}</span>
          <span class="ml-3_5">{{ item.clientName }}</span>
        </div>
        <div class="mt-1_5">回款：{{ item.repayAmt }} 元</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrow {
  position: relative;
  bottom: 0.1vw;
  font-size: 1.5rem;
}
</style>
