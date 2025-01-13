---
uuid         : e65dc803-8671-45b7-a6a9-697b77a9ad6c
order        : 3
author       : huchaomin iisa_peter@163.com
date         : 2025-01-13 11:09:33
lastEditTime : 2025-01-13 14:08:39
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Class extends 关键字

## `extends` 关键字后面可以跟多种类型的值

实际上**只要是一个有prototype属性的函数，就能被A继承**。
由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数

### Object

```js
// Object 为一个函数
class A extends Object {}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

### `Function.prototype`

```js
class A {}
// 不能写成
// class A extends Function.prototype {} //  Class extends value function () { [native code] } is not a constructor or null

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

::: tip
此时对`Function.prototype` 是js宇宙的一个奇点又有了更深的认识
:::

## 原生构造函数的继承

ECMAScript 的原生构造函数大致有下面这些

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以及 ES6 新增的

- Map()
- Set()
- WeakMap()
- WeakSet()
- Promise()
- Symbol()

以前，这些原生构造函数是无法继承的

```js
function MyArray(...arg) {
  Array.apply(this, ...arg)
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: MyArray,
    writable: true
  }
})
```

但是，这个类的行为与Array完全不一致

```js
const colors = new MyArray()
colors[0] = 'red'
colors.length // 0

colors.length = 0
colors[0] // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 `Array.apply()` 或者分配给原型对象都不行。

es6 则不然

```js
class MyArray extends Array {
  // 可省略
  constructor(...args) {
    super(...args)
  }
}

const arr = new MyArray()
arr[0] = 12
arr.length // 1

arr.length = 0
arr[0] // undefined
```

注意，继承Object的子类，有一个行为差异

```js
class NewObj extends Object {
  constructor() {
    super(...arguments)
  }
}
const o = new NewObj({ attr: true })
o.attr === true // false
```

上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。
这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数
