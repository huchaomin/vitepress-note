---
uuid         : c43187b8-213f-46f5-9826-69a841604676
order        : 3
author       : huchaomin iisa_peter@163.com
date         : 2025-01-06 14:36:20
lastEditTime : 2025-01-10 16:39:28
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# new.target

ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数(当前正在执行的函数)

如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

Class 内部调用new.target，返回当前 Class。

```js
class Rectangle {
  constructor() {
    console.log(new.target === Rectangle)
  }
}
const obj = new Rectangle() // true
```

子类继承父类时，new.target会返回子类

```js
class Rectangle {
  constructor() {
    console.log(new.target === Rectangle)
  }
}

class Square extends Rectangle {}

const obj = new Square() // false
```
