---
uuid         : d0361a18-6a61-483c-8924-49626cd12080
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2024-12-25 17:30:33
lastEditTime : 2024-12-26 11:45:04
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Intersection Observer API

## 概述

提供了一种异步检测目标元素与祖先元素或顶级文档的视口相交情况变化的方法

## IntersectionObserver 构造函数

```ts
const observer = new IntersectionObserver(callback, options)
```

### options 参数

- `root`: 用作视口的元素，用于检查目标的可见性。必须是目标的祖先。如果未指定或为 null，则默认为浏览器视口(可视视口 viewport)
- `rootMargin`: 用于扩展或缩小根元素的边界框，以使其与目标元素相交。默认值为 "0px 0px 0px 0px"，可以使用像素或百分比
- `threshold`: 一个或一组阈值，当目标元素的可见性达到或超过这些阈值时，将调用回调函数。
  - 0 默认值，表示目标元素的任何部分(1个像素)进入视口时都会触发回调函数
  - 0.5 表示目标元素的一半(50%)进入视口时触发回调函数
  - [0, 0.25, 0.5, 0.75, 1] 表示每次能见度超过 25% 时都执行回调

### callback 函数参数

1. `entries`: 一个 IntersectionObserverEntry 实例对象数组，每个对象表示一个目标元素与根元素或顶级文档视口的交叉信息
    - `boundingClientRect`: 目标元素的边界框的矩形信息，计算方式与 `Element.getBoundingClientRect()` 相同。
    - `intersectionRatio`: 目标元素的可见比例
    - `intersectionRect`: 交叉区域的矩形信息
    - `isIntersecting`: 是否处于交叉状态
    - `rootBounds`: 根元素的边界框的矩形信息
    - `target`: 被观察的目标元素
    - `time`: 返回一个记录从 IntersectionObserver 的时间原点 (time origin) 到交叉被触发的时间的时间戳
2. `observer`: 调用回调函数的 IntersectionObserver 实例

::: tip 交集的计算
交叉观察器 API 所考虑的所有区域都是矩形；形状不规则的元素被视为占据了包围元素所有部分的最小矩形。

同样，如果元素的可见部分不是矩形，那么该元素的交点矩形将被视为包含该元素所有可见部分的最小矩形
:::

## IntersectionObserver 的实例方法

### observe()

用于启动观察，接受一个参数，即要观察的目标元素

```ts
observer.observe(targetElement)
```

### unobserve()

用于停止观察，接受一个参数，即要停止观察的目标元素

```ts
observer.unobserve(targetElement)
```

### disconnect()

关闭观察器

```ts
observer.disconnect()
```

## 例子

惰性填充content

```ts
function query(selector) {
  return Array.from(document.querySelectorAll(selector))
}

const observer = new IntersectionObserver(
  function (changes) {
    changes.forEach(function (change) {
      const container = change.target
      const content = container.querySelector('template').content
      container.appendChild(content)
      observer.unobserve(container)
    })
  }
)

query('.lazy-loaded').forEach(function (item) {
  observer.observe(item)
})
```
