<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-11 11:56:35
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-02-06 13:42:54
 * @Description  :
-->
<script setup lang="ts">
const show = ref(true)

function toggleShow() {
  document.startViewTransition(() => {
    show.value = !show.value
  })
}
</script>

<template>
  <div>
    <NButton @click="toggleShow">切换图片</NButton>
    <img v-if="show" style="view-transition-name: img;" class="mt-4" src="~img/lulu.png" alt="" />
  </div>
</template>

<style>
::view-transition-group(img) {
  animation-duration: 2s;
}
</style>
