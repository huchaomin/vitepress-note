---
layout       : full
title        : 擎聪智慧大屏系统
uuid         : eef3293e-a729-40a7-bcfd-b30f248d1754
order        : 3
author       : peter peter@qingcongai.com
date         : 2024-11-29 11:20:04
lastEditTime : 2024-12-10 10:54:16
lastEditors  : peter peter@qingcongai.com
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
const userStore = useUserStore(piniaInstance)
const Index = defineClientComponent(async () => {
  if(userStore.token === ''){
    await userStore.showLoginModal()
  }
  return import('./Index.vue')
})
</script>
<Index></Index>
