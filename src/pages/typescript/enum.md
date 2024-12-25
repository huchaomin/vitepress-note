---
uuid         : 8953ae37-288e-41c2-8c85-7103bbdeb358
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2024-12-25 14:08:07
lastEditTime : 2024-12-25 14:09:59
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# enum

## 获取枚举值的类型

```ts
enum MessageTypes {
  create = 'create',
  error = 'error',
  info = 'info',
  loading = 'loading',
  success = 'success',
  warning = 'warning',
}

type MessageTypeValue = `${MessageTypes}`
```
