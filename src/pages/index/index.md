---
header: false
layout: full
title: 擎聪智慧大屏系统
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
import Login from './component/Login.vue'

const userStore = useUserStore()
const Index = defineClientComponent(async () => {
  if(userStore.token === ''){
    $modal({
      title: '请登录',
      content: () => h(Login),
      closable: false,
      negativeText: undefined,
    })
  } else {
    return import('./Index.vue')
  }
})
</script>
<Index></Index>
