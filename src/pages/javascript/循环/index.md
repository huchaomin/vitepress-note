---
uuid         : 2d620e03-8b8a-4fbd-b41c-f7d496a2c6ec
order        : 4
author       : huchaomin iisa_peter@163.com
date         : 2024-12-24 13:55:54
lastEditTime : 2024-12-24 17:53:34
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# js 循环知识漏点

## 打破循环

### 打破双循环

```ts
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i === 2 && j === 2) {
      break // 里层循环被打破
    }
    console.log(`i = ${i}, j = ${j}`)
  }
}

// i = 0, j = 0
// i = 0, j = 1
// i = 0, j = 2
// i = 0, j = 3
// i = 0, j = 4
// i = 1, j = 0
// i = 1, j = 1
// i = 1, j = 2
// i = 1, j = 3
// i = 1, j = 4
// i = 2, j = 0
// i = 2, j = 1
// i = 3, j = 0
// i = 3, j = 1
// i = 3, j = 2
// i = 3, j = 3
// i = 3, j = 4
// i = 4, j = 0
// i = 4, j = 1
// i = 4, j = 2
// i = 4, j = 3
// i = 4, j = 4
```

```ts
outerLoop: for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i === 2 && j === 2) {
      break outerLoop // 打破双层循环
    }
    console.log(`i = ${i}, j = ${j}`)
  }
}
// i = 0, j = 0
// i = 0, j = 1
// i = 0, j = 2
// i = 0, j = 3
// i = 0, j = 4
// i = 1, j = 0
// i = 1, j = 1
// i = 1, j = 2
// i = 1, j = 3
// i = 1, j = 4
// i = 2, j = 0
// i = 2, j = 1
```
