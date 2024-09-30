<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-09-05 18:18:22
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-09-30 09:56:55
 * @Description  :
-->
<script setup lang="ts">
const a = ref(1)
const b = reactive({ a: 1 })
</script>

<template>
  <div class="rounded bg-blue-500 py-2 px-4 text-base text-white">
    {{ a }}
    {{ b }}
  </div>
</template>
