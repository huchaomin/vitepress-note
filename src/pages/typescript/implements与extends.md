---
uuid         : 269b25ed-e145-4d53-b6e9-87e1510287dc
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-01-07 16:53:00
lastEditTime : 2025-01-08 09:39:28
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# implements 与 extends

## 类实现接口

```ts
interface Pingable {
  ping: () => void
}

class Ball implements Pingable { // Error 类型 "Ball" 中缺少属性 "ping"，但类型 "Pingable" 中需要该属性
  pong() {}
}

class Sonar implements Pingable {
  ping() {}
}
```

可一次性实现多个接口

```ts
class C implements A, B {}
```

注意：`implements` 并不能改变类的类型

```ts
interface Checkable {
  check: (name: string) => boolean
}

class NameChecker implements Checkable {
  check(s) { // 此处的 s 类型为 any
    return s.toLowerCase() === 'ok'
  }
}
```

## 类继承类

同名方法的参数类型必须一致

```ts
class Base {
  greet() {
    console.log('Hello, world!')
  }
}

class Derived extends Base {
  greet(name: string) { // Error 不能将类型“(name: string) => void”分配给类型“() => void”
    console.log(`Hello, ${name.toUpperCase()}`)
  }
}
```

### `--useDefineForClassFields`(true if target is ES2022 or higher, including ESNext; false otherwise) 与 `declare`

如果我们想要在子类中重新声明一个更准确的类型，可以使用 `declare` 关键字

::: details 查看英文原文
When `target >= ES2022` or `useDefineForClassFields` is true, class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class.

This can be a problem when you only want to re-declare a more accurate type for an inherited field.

To handle these cases, you can write declare to indicate to TypeScript that there should be no runtime effect for this field declaration
:::

```ts
class AnimalHouse {
  resident: Animal
  constructor(animal: Animal) {
    this.resident = animal
  }
}

class DogHouse extends AnimalHouse {
  declare resident: Dog
  // 或者给 resident 一个默认值
  // resident: Dog = {
  // ...
  // }

  constructor(dog: Dog) {
    super(dog)
  }
}
```

### 父子类实例化顺序

```ts
class Base {
  name = 'base'
  constructor() {
    console.log(this.name)
  }
}

class Derived extends Base {
  name = 'derived'
}

// eslint-disable-next-line no-new
new Derived() // Prints "base", not "derived"
```

1. The base class fields are initialized
2. The base class constructor runs
3. The derived class fields are initialized
4. The derived class constructor runs

## 接口继承接口

```ts
interface Alarm {
  alert: () => void
}

interface LightableAlarm extends Alarm {
  lightOff: () => void
  lightOn: () => void
}
```

## 接口继承类

```ts
interface Point3d extends Point {
  z: number
}

class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const point3d: Point3d = { x: 1, y: 2, z: 3 }
```

为什么 TypeScript 会支持接口继承类呢？

实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。

```ts
interface PointInstanceType {
  x: number
  y: number
}
```

接口实际上继承的是类的实例类型

::: warning
实例的类型不仅不包括构造函数，也不包括类的静态属性或静态方法
:::
