---
uuid         : 6bbbad82-493e-40fe-9ded-fe5e985358cc
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-01-10 16:07:12
lastEditTime : 2025-01-13 11:09:01
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Class 的继承

## 与 es5 继承机制的区别

ES6 规定，子类必须在 `constructor()` 方法中调用 `super()`，否则就会报错

```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y) // 必须调用
    this.color = color
  }

  toString() {
    return `${this.color} ${super.toString()}` // 调用父类的toString()
  }
}
```

::: tip 这点与 es5 不同
ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”

ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类

这意味着新建子类实例时，父类的构造函数必定会先运行一次。
:::

::: warning
由上可知在子类的构造函数中，只有调用 `super()`之后，才可以使用this关键字，否则会报错
:::

## 私有的属性和方法的继承

父类所有的属性和方法，都会被子类继承，除了私有的属性和方法

```js
class Foo {
  #p = 1
  getP() {
    return this.#p
  }
}

class Bar extends Foo {
  constructor() {
    super()
    console.log(this.getP()) // 1
    // this.#p // 报错
    // super.#p // 报错
  }
}
```

## 静态的属性和方法的继承

通过浅拷贝实现继承

```js
class A {
  static foo = 100
}
class B extends A {
  constructor() {
    super()
    B.foo--
  }
}

const b = new B()
B.foo // 99
A.foo // 100
```

```js
class A {
  static foo = { n: 100 }
}

class B extends A {
  constructor() {
    super()
    B.foo.n--
  }
}

const b = new B()
B.foo.n // 99
A.foo.n // 99
```

## `prototype` 属性和 `__proto__` 属性

大多数浏览器的 ES5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 `prototype`属性。

Class 作为构造函数的语法糖，同时有 `prototype` 属性和 `__proto__` 属性，因此同时存在两条继承链

- 子类的 `__proto__` 属性，表示**构造函数**的继承，总是指向父类 <n-tag type="info" size="small">与 es5 的不同</n-tag>
- 子类的 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性

```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

::: tip 这两条继承链，可以这样理解
作为一个对象，子类B的原型(__proto__属性)是父类A

作为一个构造函数，子类B的原型对象(prototype属性)是父类的原型对象(prototype属性)的实例
:::

```js
class Point { /* ... */ }
class ColorPoint extends Point { /* ... */ }
Object.getPrototypeOf(ColorPoint) === Point // TODO true
```
