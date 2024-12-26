---
uuid         : 13526969-fd51-47c0-8f3f-ae1db46283c0
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2024-12-24 09:20:23
lastEditTime : 2024-12-25 16:57:37
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Mutation Observer API

## 概述

1. 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动
2. DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发(DOM 事件是立即触发, 与这个不同)
    ::: tip
    文档中连续插入1000个 `<p>` 元素，就会连续触发1000个插入事件(立即)，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次
    :::
3. 待所有脚本任务完成后，才会运行
4. 把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动
5. 可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动

## MutationObserver 构造函数

```ts
const observer1 = new MutationObserver((mutations, observer2) => {
  mutations.forEach(function (mutation) {
    console.log(mutation)
  })
  console.log(observer1 === observer2) // true;
})
```

## MutationObserver 的实例方法

### observe()

用来启动监听，它接受两个参数

- 所要观察的 DOM 节点
- 观察选项对象，用来指定所要观察的变动类型

```ts
observer.observe(DOMElement, {
  attributeFilter: ['class', 'style', 'src'], // 仅监视指定的属性
  attributeOldValue: true, // 监视目标节点属性变动时，记录变动前的属性值
  attributes: true, // 监视目标节点的属性变动
  characterData: true, // 监视目标节点内容或节点文本的变动
  characterDataOldValue: true, // 监视目标节点内容或节点文本变动时，记录变动前的值
  childList: true, // 监视目标节点的子节点变动，包括：新增、删除、更改
  subtree: true // 监视目标节点的所有后代节点
})
```

#### characterData 只能观察文本节点

```ts
// <div id="box">Hello</div>
const textNode = document.getElementById('box').childNodes[0]
observer.observe(textNode, {
  characterData: true
})
textNode.textContent = 'Hi' // 触发回调

const box = document.getElementById('box')
observer.observe(box, {
  characterData: true
})
box.textContent = 'Hi' // 不触发回调
```

::: warning
对一个节点添加观察器，就像使用addEventListener()方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。

如果指定不同的options对象，以后面添加的那个为准，类似覆盖
:::

### takeRecords()

用来清空 MutationObserver 实例内部的记录，返回一个记录的副本, 类似创建一个快照

```ts
const records = observer.takeRecords()
```

### disconnect()

用来停止观察， 调用该方法后，DOM 再发生变动，也不会触发观察器

```ts
observer.disconnect()
```

## MutationRecord 对象

- DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息
- 回调函数的第一个参数就是这个实例的数组
- MutationRecord 实例有以下属性
  - type: 变动类型，可能的值有：attributes、childList、characterData
  - target: 发生变动的 DOM 节点
  - addedNodes: 新增的 DOM 节点
  - removedNodes: 删除的 DOM 节点
  - previousSibling: 前一个同级节点，如果没有则返回null
  - nextSibling: 下一个同级节点，如果没有则返回null
  - attributeName: 被修改的属性， 如果设置了attributeFilter，则只返回预先指定的属性。
  - oldValue: 被修改的属性的前一个值， 这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null

## 实战

### 使用MutationObserver对象封装一个监听 DOM 生成的函数(TODO 使用Class)

```ts
(function (win) {
  'use strict'

  const listeners = []
  const doc = win.document
  const MutationObserver = win.MutationObserver || win.WebKitMutationObserver
  let observer

  function ready(selector, fn) {
    // 储存选择器和回调函数
    listeners.push({
      fn,
      selector
    })
    if (!observer) {
      // 监听document变化
      observer = new MutationObserver(check)
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      })
    }
    // 检查该节点是否已经在DOM中
    check()
  }

  function check() {
  // 检查是否匹配已储存的节点
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      // 检查指定节点是否有匹配
      const elements = doc.querySelectorAll(listener.selector)
      for (let j = 0; j < elements.length; j++) {
        const element = elements[j]
        // 确保回调函数只会对该元素调用一次
        if (!element.ready) {
          element.ready = true
          // 对该节点调用回调函数
          listener.fn.call(element, element)
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready
})(this)

// 使用方法
ready('.foo', function (element) {
  // ...
})
```

### 获取 `GISCUS-WIDGET` iframe

```vue
<script setup lang="ts">
const rootRef = ref<HTMLElement | null>(null)
const observeConfig = {
  childList: true,
  subtree: true,
}
let observer: MutationObserver
onMounted(() => {
  observer = new MutationObserver((mutationsList) => {
    outerLoop: for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeName === 'GISCUS-WIDGET') {
          const innerObserver = new MutationObserver((mutationsList) => {
            innerObserver.disconnect()
            // @ts-expect-error shadowRoot 存在
            const iframe = mutationsList[0].target.shadowRoot.querySelector('iframe')
            console.log(iframe.contentWindow)
          })
          innerObserver.observe(node, {
            attributes: true,
          })
          break outerLoop
        }
      }
    }
  })
  observer.observe(rootRef.value!, observeConfig)
})

onUnmounted(() => {
  observer.disconnect()
})
</script>
```

## 参考

- [wangdoc](https://wangdoc.com/javascript/dom/mutationobserver)
- [vueuse](https://vueuse.org/core/useMutationObserver/#usemutationobserver)
