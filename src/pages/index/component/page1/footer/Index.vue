<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-06 10:59:39
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 14:59:13
 * @Description  :
-->
<script setup lang="ts">
import footerSvg from '@/pages/index/assets/svg/footer1.svg?raw'

</script>

<script setup lang="ts">

</script>

<template>
  <div class="flex justify-center footer_wrapper absolute">
    <div class="img" v-html="footerSvg"></div>
  </div>
</template>

<style scoped>
.footer_wrapper {
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
