---
layout       : full
title        : 智慧大屏
uuid         : eef3293e-a729-40a7-bcfd-b30f248d1754
order        : 7
author       : peter peter@qingcongai.com
date         : 2024-11-29 11:20:04
lastEditTime : 2024-12-19 22:37:13
lastEditors  : huchaomin iisa_peter@163.com
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
