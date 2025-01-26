<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-11 11:56:35
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-26 14:33:04
 * @Description  :
-->
<script setup lang="ts">
const show = ref(true)

function toggleShow() {
  document.startViewTransition(() => {
    // setTimeout(() => {
    debugger
    show.value = !show.value
    // }, 1000)
    // nextTick(() => {
    // })
  })
}
</script>

<template>
  <div>
    <NButton @click="toggleShow">切换图片</NButton>
    <img v-if="show" class="mt-4" src="~img/lulu.webp" alt="" />
  </div>
</template>
