<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 22:14:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-28 00:25:35
 * @Description  :
-->
<script setup lang="ts">
interface Item {
  amount: number
  name: string
  time: string
}

withDefaults(
  defineProps<{
    index: number
    item: Item
  }>(),
  {},
)

</script>

<template>
  <div class="flex items-center">
    <div class="flex items-start">
      <i-line-md:play-filled
        class="arrow mr-2" :style="{
        color: `var(${ index === 0 ? '--color-yellow' : '--color-white' })`,
        animation: index === 0 ? '2s linear -0.625s infinite normal forwards running breath' : 'none',
      }"></i-line-md:play-filled>
      <div>
        <div>
          <span>{{ item.time }}</span>
          <span class="ml-3_5">{{ item.name }}</span>
        </div>
        <div class="mt-1_5">回款：{{ item.amount }} 元</div>
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
