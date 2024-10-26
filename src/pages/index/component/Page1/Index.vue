<script setup lang="ts">
  import RefundScroll from './RefundScroll.vue';
</script>

<template>
  <div class="absolute w-full h-full page1_wrapper">
    <RefundScroll></RefundScroll>
  </div>
</template>
<style scoped>
  .page1_wrapper {
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  }
</style>
