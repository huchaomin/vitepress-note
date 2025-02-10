---
uuid         : 74d9b286-d919-49d4-ad0d-e3282a966721
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-02-10 10:05:50
lastEditTime : 2025-02-10 10:12:16
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# setup语法糖中导出

## 需求背景

有些时候我们在使用`setup script`语法糖的时候，我们需要导出一些变量或者方法给其他组件使用，那么我们如何导出呢？

## 解决方案

新增一个`script`标签，然后在`script`标签中导出我们需要导出的变量或者方法即可。

```vue
<script lang="ts">
// import statement
export const name = ref('***')
</script>

<script setup lang="ts">
// other code
</script>

<template>
  <div>{{ name }}</div>
</template>
```
