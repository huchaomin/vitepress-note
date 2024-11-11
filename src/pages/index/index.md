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
    const loginInstance = ref<InstanceType<typeof Login>|null>(null)
    return new Promise((resolve) => {
      $modal({
        title: '请登录',
        content: () => h(Login, { ref: loginInstance }),
        closable: false,
        negativeText: undefined,
        onPositiveClick: async () => {
          await loginInstance.value!.handleSubmit()
          resolve(import('./Index.vue'))
        }
      })
    })
  } else {
    return import('./Index.vue')
  }
})
</script>
<Index></Index>
