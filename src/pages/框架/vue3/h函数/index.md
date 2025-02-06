---
uuid         : 5e784826-cb4a-4bdb-8803-649a3e4a8df1
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-02-06 17:01:26
lastEditTime : 2025-02-06 18:24:15
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# h() 函数

h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”

- attribute：html特性
- property：dom属性

## 使用非常灵活

1. attribute 和 property 都能在 prop 中书写,Vue 会自动将它们分配到正确的位置
    <Demo src="./Demo.vue" />

2. attribute 和 property 简写法：可以分别通过 `^`（html特性）和 `.` （dom属性）前缀来添加
    <Demo src="./Demo1.vue" />

3. 没有 props 时可以省略不写

## Vnodes 必须唯一

```ts
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // error 重复的 vnodes 是无效的
    p,
    p
  ])
}
```

## 事件修饰符

### `.passive`、`.capture` 和 `.once`

```ts
h('input', {
  onClickCapture() {
    /* 捕捉模式中的监听器 */
  },
  onKeyupOnce() {
    /* 只触发一次 */
  },
  onMouseoverOnceCapture() {
    /* 单次 + 捕捉 */
  }
})
```

### 对于事件和按键修饰符，可以使用 withModifiers 函数

```ts
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

## 插槽

### 渲染插槽

```ts
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      h('div', slots.default()),
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

### 传递插槽

```ts
h(MyComponent, null, {
  default: () => 'default slot',
  foo: () => h('div', 'foo')
})
```

## 指令

### `v-model`

```ts
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

### 自定义指令

```ts
import { h, withDirectives } from 'vue'

// 自定义指令
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```
