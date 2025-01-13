---
uuid         : 1481c2e9-596b-4f87-9378-a0095b09e1d8
order        : 2
author       : huchaomin iisa_peter@163.com
date         : 2025-01-10 16:44:44
lastEditTime : 2025-01-13 10:08:00
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Class super 关键字

## super作为函数调用时，代表父类的构造函数

### 返回的是子类的实例

此时 `super()` 相当于 `父类构造函数.call(this)`。（在子类的this上运行父类的构造函数）

### 执行时，子类的属性还没有绑定到this，所以如果存在同名属性，此时拿到的是父类的属性

```js
class A {
  name = 'A'
  constructor() {
    console.log(`My name is ${this.name}`)
  }
}

class B extends A {
  name = 'B'
}

const b = new B() // My name is A
```

::: details 我的理解

1. `super()` 执行时，创建一个空的对象
2. 将这个空的对象指向子类的this
3. 将这个空的对象的原型指向 B.prototype, 而 B.prototype 的原型 指向 A.prototype
4. 将 A 的实例属性添加到这个空的对象上
5. 执行构造函数，将子类的属性添加到这个空的对象上
6. 继续执行子类的构造函数
7. 子类的构造函数执行完成之后，返回这个空的对象
:::

看看方法会不会出现同样的问题

```js
class A {
  name = 'A'
  constructor() {
    console.log(`My name is ${this.getX()}`)
  }

  getX() {
    return 'xa'
  }
}

class B extends A {
  name = 'B'
  getX() {
    return 'xb'
  }
}

const b = new B() // My name is xb
```

由上可见方法是没有问题的

::: warning
`super()` 函数只能用在子类的构造函数之中，用在其他地方就会报错
:::

## super作为对象调用时

### 在普通方法中(包括constructor)

- 指向父类的原型对象；调用父类原型对象的方法时，方法内部的this指向子类实例
- 对某个属性赋值时，直接指向子类实例

有趣的赋值

```js
class A {
  constructor() {
    this.x = 1
  }
}

class B extends A {
  constructor() {
    super()
    this.x = 2
    super.x = 3
    console.log(super.x) // undefined
    console.log(this.x) // 3
  }
}

const b = new B()
```

### 在静态方法中，指向父类(不是实例); 调用父类的方法时，方法内部的this指向当前的子类(不是实例)

```js
class A {
  constructor() {
    this.x = 1
  }

  static print() {
    console.log(this.x)
  }
}

class B extends A {
  constructor() {
    super()
    this.x = 2
  }

  static m() {
    super.print()
  }
}

B.x = 3
B.m() // 3
```

## 可以在任意一个对象中，使用super关键字

```js
const obj = {
  toString() {
    return `MyObject: ${super.toString()}`
  }
}

obj.toString() // MyObject: [object Object]
```
