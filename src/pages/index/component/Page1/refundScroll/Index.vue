<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-25 18:15:43
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-27 00:19:45
 * @Description  :
-->
<script setup lang="ts">
import StreamerBorder from './StreamerBorder.vue'
import ScrollItem from './ScrollItem.vue'
</script>

<template>
  <div class="refund_scroll_wrapper absolute">
    <StreamerBorder style="padding: 1vw 0.5vw;">
      <div class="ml-4" style="font-size: 1.2rem;">回款实时监控</div>
      <div class="mt-4">
        <ScrollItem></ScrollItem>
      </div>
    </StreamerBorder>
  </div>
</template>

<style scoped>
.refund_scroll_wrapper {
  right: 24vw;
  bottom: 8vw;
  width: 12vw;
  height: 20vw;
  color: var(--color-white);
}
</style>
