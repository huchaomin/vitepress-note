---
uuid         : 2697c899-d635-40f0-8e50-5e04d1c9a800
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-01-11 11:50:46
lastEditTime : 2025-01-11 14:20:20
lastEditors  : huchaomin iisa_peter@163.com
description  :
---
# View Transitions

<script setup lang="ts">
import Demo from './Demo.vue'
</script>
是一种用于在不同视图或页面之间进行平滑过渡的技术。它可以增强用户体验，使页面切换更加流畅和自然

## startViewTransition

### 语法

```ts
document.startViewTransition(callback)
```

### 参数

1. callback

    一个在视图过渡过程中通常用于更新 DOM 的回调函数，它返回一个 Promise
    这个回调函数在 API 截取了当前页面的屏幕截图后被调用。
    当回调函数返回的 Promise 兑现时，视图过渡将在下一帧开始。如果回调函数返回的 Promise 拒绝，过渡将被放弃。

<demo vue="./Demo.vue" />
