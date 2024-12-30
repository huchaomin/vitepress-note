---
layout       : full
title        : 智慧大屏
uuid         : eef3293e-a729-40a7-bcfd-b30f248d1754
order        : 8
author       : peter peter@qingcongai.com
date         : 2024-11-29 11:20:04
lastEditTime : 2024-12-30 18:24:34
lastEditors  : huchaomin iisa_peter@163.com
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
import Index from './Index.vue'

const userStore = useUserStore(piniaInstance)

if(userStore.token === ''){
  userStore.showLoginModal()
}

const compo = computed(() => {
  if(userStore.token === '') {
    return null
  } else {
    return Index
  }
})
</script>
<component :is="compo"></component>
