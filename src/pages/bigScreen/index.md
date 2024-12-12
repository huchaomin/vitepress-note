---
layout       : full
title        : 擎聪智慧大屏系统
author       : peter peter@qingcongai.com
date         : 2024-11-29 11:20:04
lastEditors  : peter peter@qingcongai.com
lastEditTime : 2024-12-10 10:54:16
order        : 3
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
