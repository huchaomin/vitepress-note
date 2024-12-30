---
uuid         : d431492d-69cd-46d7-91d2-1b718adc8a3c
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2024-12-30 11:03:32
lastEditTime : 2024-12-30 15:01:00
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# requestAnimationFrame

## 概述

`window.requestAnimationFrame()` 方法会告诉浏览器你希望执行一个动画。它要求浏览器在下一次重绘之前，调用用户提供的回调函数

::: tip
对回调函数的调用频率通常与显示器的刷新率相匹配, 常见的刷新率还是 60hz（每秒 60 个周期/帧）

为了提高性能和电池寿命，大多数浏览器都会暂停在后台选项卡或者隐藏的 `<iframe>` 中运行的 `requestAnimationFrame()`
:::

## 语法

```ts
window.requestAnimationFrame(callback)
```

### 参数

1. `callback`: 该函数会在下一次重绘更新你的动画时被调用到
    1. `DOMHighResTimeStamp` 用于表示上一帧渲染的结束时间
        - 时间戳是一个以毫秒为单位的十进制数字，（最小精度为 1 毫秒？ 谷歌浏览器，看得到小数哦）
        - 对于 Window 对象（而非 workers）来说，它等同于 `document.timeline.currentTime`
        - 在同一代理上（所有同源的 window，更重要的是同源的 iframe）运行的所有窗口之间共享, 所以它允许在多个 requestAnimationFrame 回调函数中执行同步动画
        - 此时间戳值也近似于在回调函数开始时调用 `performance.now()`，但它们永远都不会是相同的值
        - 当 requestAnimationFrame() 队列中的多个回调开始在同一帧中触发时，它们都会收到相同的时间戳，即便在计算前一个回调函数工作量时这一帧的时间已经过去

### 返回值

一个整数值，该值是请求回调函数的唯一标识符，可以传递给 `window.cancelAnimationFrame()` 以取消回调

## 示例

### 移动元素，使其在 2 秒内从左侧移动到右侧

```ts
const element = document.getElementById('some-element-you-want-to-animate')
let start
let done = false

function step(timestamp) {
  if (start === undefined) {
    start = timestamp
  }
  const elapsed = timestamp - start
  // 这里使用 Math.min() 确保元素在恰好位于 200px 时停止运动
  const count = Math.min(0.1 * elapsed, 200)
  element.style.transform = `translateX(${count}px)`
  if (count === 200) {
    done = true
  }
  if (elapsed < 2000) {
    previousTimeStamp = timestamp
    if (!done) {
      window.requestAnimationFrame(step)
    }
  }
}
window.requestAnimationFrame(step)
```

### 依赖首次调用的动画

```ts
// 方法一：初始值从第一个Frame里面获取
let zero
requestAnimationFrame(firstFrame)
function animate(timeStamp) {
  const value = (timeStamp - zero) / duration
  if (value < 1) {
    element.style.opacity = value
    requestAnimationFrame((t) => animate(t))
  } else {
    element.style.opacity = 1
  }
}
function firstFrame(timeStamp) {
  zero = timeStamp
  animate(timeStamp)
}
// 方法二：初始值从 document.timeline.currentTime 获取
const zero = document.timeline.currentTime
requestAnimationFrame(animate)
function animate(timeStamp) {
  const value = (timeStamp - zero) / duration
  if (value < 1) {
    element.style.opacity = value
    requestAnimationFrame((t) => animate(t))
  } else {
    element.style.opacity = 1
  }
}
```

上面的代码不一定等价，可进行如下实验

```ts
const currentTime = document.timeline.currentTime
function firstFrame(timeStamp) {
  console.log(currentTime)
  console.log(timeStamp)
  // 有时true，有时false
  // 两者的差值是不是可以理解为上面currentTime取值的时间 到 上一帧渲染的结束时间 之间的时间差
  // 盲猜 0 < (timeStamp - currentTime) < 16.666
  console.log(timeStamp === currentTime)
}
requestAnimationFrame(firstFrame)
```

继续实验

```ts
function firstFrame(timeStamp) {
  const currentTime = document.timeline.currentTime
  console.log(currentTime)
  console.log(timeStamp)
  console.log(currentTime === timeStamp) // 始终为 true
}
requestAnimationFrame(firstFrame)
```

因此，通过实验得知，方法一在第一次调用 animate，获取里面的 value 时更为准确

::: warning
因为某些浏览器在首次调用 `requestAnimationFrame()` 和首次调用回调函数之间会有多帧延迟。

因此，如果一定在意第一帧的值，推荐使用方法一
:::

可使用 `performance.now()` 来获取时间戳， 但精度不够

```ts
const zero = performance.now()
// ...
```
