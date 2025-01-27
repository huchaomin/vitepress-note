<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-11 11:56:35
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-27 18:24:52
 * @Description  :
-->
<script setup lang="ts">
const show = ref(true)

function toggleShow() {
  const instance = document.startViewTransition(() => {
    const aaa = document.querySelector('#aaa')!
    // 2. resolve, ok
    // Promise.resolve().then(() => {
    //   aaa.remove()
    // })
    // 3. setTimeout, 不行
    setTimeout(() => {
      aaa.remove()
    })
  })
  instance.updateCallbackDone.then(() => {
    debugger
    console.log('updateCallbackDone', document.querySelector('#aaa'))
  })
  instance.ready.then(() => {
    debugger
    console.log('ready', document.querySelector('#aaa'))
  })
}
</script>

<template>
  <div>
    <NButton @click="toggleShow">切换图片</NButton>
    <img
      v-if="show"
      id="aaa"
      style="view-transition-name: img;"
      class="mt-4"
      src="~img/lulu.png"
      alt=""
    />
  </div>
</template>

<style>
::view-transition-group(img) {
  animation-duration: 2s;
}
</style>
