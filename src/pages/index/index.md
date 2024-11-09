---
header: false
layout: full
title: 擎聪智慧大屏系统
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const userStore = useUserStore()
const Index = defineClientComponent(async () => {
  return import('./Index.vue')
  // if(useStore.token === ''){

  // } else {
  // }
})
</script>
<Index></Index>
