---
layout       : full
title        : 智慧大屏
uuid         : eef3293e-a729-40a7-bcfd-b30f248d1754
order        : 11
author       : peter peter@qingcongai.com
date         : 2024-11-29 11:20:04
lastEditTime : 2024-12-31 14:25:21
lastEditors  : huchaomin iisa_peter@163.com
---

<script setup lang="ts">
import { defineClientComponent, inBrowser  } from 'vitepress'

const userStore = useUserStore(piniaInstance)

if(userStore.token === '' && inBrowser) {
  userStore.showLoginModal()
}

const compo = computed(() => {
  if(userStore.token === '') {
    return null
  } else {
    return defineClientComponent(() => {
      return import('./Index.vue')
    })
  }
})
</script>
<component :is="compo"></component>
