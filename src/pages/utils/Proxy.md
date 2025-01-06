---
uuid         : e253376d-d776-4ba9-8d52-c09e160aec47
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-01-06 14:30:09
lastEditTime : 2025-01-06 14:31:38
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Proxy

## 从一个对象上获取方法，自动为该方法绑定 this

```js
function selfish(target) {
  const cache = new WeakMap()
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') {
        return value
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target))
      }
      return cache.get(value)
    }
  }
  const proxy = new Proxy(target, handler)
  return proxy
}

const logger = selfish(new Logger())
```
