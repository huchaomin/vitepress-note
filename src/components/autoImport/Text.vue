<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-09-05 18:18:22
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-09-06 09:35:42
 * @Description  :
-->
<script setup lang="ts">
const a = ref(1)
const b = reactive({ a: 1 })
</script>

<template>
  <div>
    {{ a }}
    {{ b }}
  </div>
</template>
