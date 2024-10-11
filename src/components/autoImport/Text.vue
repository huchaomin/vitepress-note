<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-10 15:27:39
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-11 09:04:38
 * @Description  :
-->
<script setup lang="ts">
function handleClick() {
  console.log('click')
}
</script>

<template>
  <div class="card ml-16 bg-white dark:bg-slate-900">
    <div class="group">
      <div class="group-[:nth-of-type(3)_&]:block">sdfsdfsdfs</div>
      <button class="button">点击</button>
    </div>
    <p>
      <a class="link" href="#" @click="handleClick">点击</a>
    </p>
  </div>
</template>

<style scoped>
.oneItem {
  display: block;
}
</style>
