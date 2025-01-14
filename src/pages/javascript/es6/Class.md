---
uuid         : 1fb611c9-1601-4cd9-956c-c018f3c26f53
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-01-06 10:22:33
lastEditTime : 2025-01-14 09:42:08
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Class

## 前言

### ES6 的类，完全可以看作构造函数的另一种写法

```js
class Point {}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

### 与 es5 不同

1. 类的内部所有定义的方法，都是不可枚举的

    ```js
    class Point {
      constructor() {}
      toString() {}
    }

    Object.keys(Point.prototype)
    // []
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    ```

    ```js
    const Point = function (x, y) {}

    Point.prototype.toString = function () {}

    Object.keys(Point.prototype)
    // ["toString"]
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    ```

2. 不存在变量提升

    ```js
    new Foo() // ReferenceError
    class Foo {}
    ```

## constructor 方法

没有显式定义，一个空的constructor方法会被默认添加

```js
class Point {}
// 等同于
class Point {
  constructor() {}
}
```

通过new命令生成对象实例时，自动调用该方法,返回实例对象（即this）,当然也可以返回另一个对象

```js
class Foo {
  constructor() {
    return Object.create(null)
  }
}
new Foo() instanceof Foo // false
```

## getter 和 setter

```js
class MyClass {
  get prop() {
    return 'getter'
  }

  set prop(value) {
    console.log(`setter: ${value}`)
  }

  constructor() {}
}
const inst = new MyClass()
inst.prop = 123
// setter: 123
inst.prop
// 'getter'
Object.getOwnPropertyNames(Object.getPrototypeOf(inst))
// ["constructor","prop"]
```

## 属性名可采用表达式的形式

```js
const methodName = 'getArea'
const propName = 'propName'

class Square {
  constructor(length) {
    this[propName] = length
  }

  [methodName]() {}
}
```

## Class 表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = class Me {
  getClassName() {
    return Me.name
  }
}
// Me只在 Class 的内部可用,在 Class 外部，这个类只能用MyClass引用

// 也可以简写
const MyClass = class { /* ... */ }
```

立即执行的 Class

```js
const person = new class {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
}('张三')
person.sayName() // 张三
```

## Class 的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}
Foo.classMethod() // 'hello'
const foo = new Foo()
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

如果静态方法包含this关键字，这个this指的是类，而不是实例

```js
class Foo {
  static bar() {
    this.baz() // 相当于Foo.baz()
  }

  static baz() {
    console.log('hello')
  }

  baz() {
    console.log('world')
  }
}
Foo.bar() // hello
```

父类的静态方法，可以被子类继承

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}
class Bar extends Foo {}
Bar.classMethod() // 'hello'
```

静态方法也是可以从super对象上调用的

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}
class Bar extends Foo {
  static classMethod() {
    return `${super.classMethod()}, too`
  }
}
Bar.classMethod() // "hello, too"
```

## Class 静态属性(提案，目前还没有正式被纳入 ECMAScript 标准)

静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性

```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1

// 新写法
class Foo {
  static prop = 1
}
```

## Class 私有方法和私有属性

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问

### 早期解决方案

1. 方法一：

    ```js
    class Widget {
      foo(...args) {
        bar.call(this, ...args)
      }
    }
    function bar() {}
    ```

2. 方法二：

    ```js
    const bar = Symbol('bar')
    class MyClass {
      [bar]() {}
    };
    ```

    但是高手还是拿的到

    ```js
    const inst = new MyClass()
    console.log(inst[Reflect.ownKeys(MyClass.prototype)[1]])
    // ƒ [bar]() {}
    ```

ES2022正式为class添加了私有属性

```js
class Foo {
  #a
  #b
  constructor(a, b) {
    this.#a = a
    this.#b = b
  }
  #sum() {
    return #a + #b
  }
  printSum() {
    console.log(this.#sum())
  }
}
```

::: warning

1. 从 Chrome 111 开始，开发者工具里面可以读写私有属性，不会报错，原因是 Chrome 团队认为这样方便调试
2. 不管在类的内部或外部，读取一个不存在的私有属性，会报错(公开属性如果不存在，会返回undefined)
:::

### 私有属性也可以设置 getter 和 setter 方法

```js
class Counter {
  #xValue = 0

  get #x() {
    return this.#xValue
  }

  set #x(value) {
    this.#xValue = value
  }

  constructor() {
    console.log(this.#x)
  }
}
```

### 私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性

```js
class Foo {
  #privateValue = 42
  static getPrivateValue(foo) {
    return foo.#privateValue
  }
}

Foo.getPrivateValue(new Foo()) // 42
```

### 加上 static 关键字，表示这是一个静态的私有属性或私有方法

```js
class FakeMath {
  static PI = 22 / 7
  static #totallyRandomNumber = 4

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber()
  }

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

### 与 in 操作符

判断某个对象是否为类的实例

```js
class C {
  #brand
  static isC(obj) {
    try {
      obj.#brand
      return true
    } catch {
      return false // 访问不存在的私有属性会报错
    }
  }
}
```

ES2022 改进了in运算符，使它也可以用来判断私有属性

```js
class C {
  #brand

  static isC(obj) {
    if (#brand in obj) {
      // 私有属性 #brand 存在
      return true
    } else {
      // 私有属性 #foo 不存在
      return false
    }
  }
}
```

## Class 静态块(static block ES2022)

允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化

比如我想初始化静态属性

```js
class C {
  static x = 234
  static y
  static z
  constructor() {
    // 这里写,坏处是每次实例化都会执行
  }
}

// 类外部写，坏处是将类的内部逻辑写到了外部
try {
  const obj = doSomethingWith(C.x)
  C.y = obj.y
  C.z = obj.z
} catch {
  C.y = 'y'
  C.z = 'z'
}
```

采用静态块

```js
class C {
  static x = 234
  static y
  static z

  // 只运行一次
  // 只能访问之前声明的静态属性
  // 不能有return语句
  // 可以使用类名或this
  static {
    try {
      const obj = doSomethingWith(this.x)
      this.y = obj.y
      this.z = obj.z
    } catch {
      this.y = 'y'
      this.z = 'z'
    }
  }
}
```

## 综合

```js
class Rectangle {
  static staticWidth = 20
  // 实例属性 可写可不写
  height = 0
  width = 0

  // 原型链上的Getter
  get area() {
    return this.calcArea()
  }

  // constructor
  constructor(height, width) {
    // 实例属性(必须定义在类的方法里)
    this.height = height
    this.width = width
  }

  // 静态方法(不需要实例化该类，不能通过实例调用静态方法)
  static calcGirth(height, width) {
    return height * 2 + width * 2
  }

  static getDoubleStaticWidth() {
    return this.staticWidth * 2 // this表示类构造函数
  }

  // 原型链上的方法
  calcArea() {
    return this.height * this.width
  }

  getDoublePrototypeWidth() {
    return this.prototypeWidth * 2 // this表示类实例，此时prototypeWidth从原型链继承过来
  }
}
// 原型的数据属性（必须定义在类定义的外面）
Rectangle.prototype.prototypeWidth = 25
const square = new Rectangle(10, 10)

console.log(square.area) // 100
console.log(square.calcArea()) // 100

console.log(square.calcGirth(10, 10)) // square.calcGirth is not a function
console.log(Rectangle.calcGirth(10, 10)) // 40

console.log(Rectangle.getDoubleStaticWidth()) // 40
console.log(square.getDoublePrototypeWidth()) // 50
```
