<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-19 12:14:52
 * @Description  :
-->
<script setup lang="ts">
import { BorderBox11 } from '@kjgl77/datav-vue3'
</script>

<template>
  <!-- <div class="flex h-screen w-screen items-center justify-center">
    <div style="aspect-ratio: 16/9;">
      <BorderBox11 ref="dvBorder11" title="dv-border-box-11" :title-width="400">
        <div dv-bg>dv-border-box-11</div>
      </BorderBox11>
    </div>
  </div> -->
  <div class="parent">
    <div class="child">asdas</div>
  </div>
</template>

<style>
.parent {
  position: relative;
  width: 100vw; /* 父元素宽度 */
  height: 100vh; /* 父元素高度 */
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%; /* 最大宽度不超过父元素 */
  height: 0; /* 设置高度为0，通过padding-bottom保持宽高比 */
  max-height: 100%; /* 最大高度不超过父元素 */
  padding-bottom: 56.25%; /* 16:9 的宽高比 */
  background-color: lightblue; /* 背景颜色，便于观察 */
}
</style>
