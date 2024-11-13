---
header: false
layout: full
title: 擎聪智慧大屏系统
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const userStore = useUserStore(piniaInstance)
const Index = defineClientComponent(async () => {
  // if(userStore.token === ''){
  //   await userStore.showLoginModal()
  // }
  return import('./Index.vue')
})
</script>
<Index></Index>
