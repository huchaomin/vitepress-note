---
uuid         : 5e725374-f693-4355-85fc-33f8cf275783
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-01-07 11:52:49
lastEditTime : 2025-01-07 14:09:25
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# typescript 开发过程中遇到的其他问题

## vue3

### vue InstanceType: Unsafe call of a(n) any typed value

如图所示

![Unsafe call of a(n) any typed value](./Unsafe%20call%20of%20a(n)%20any%20typed%20value.png)

最后发现是

```ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
```

`DefineComponent` 第三个泛型参数不能传 `any`， 他是 `return from data()` 的类型。改成下面的就可以了

```ts
const component: DefineComponent<object, object, object>
// 或者
const component: DefineComponent
```
