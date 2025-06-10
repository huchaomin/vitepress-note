---
uuid         : d8264a2b-75f1-4b5b-9bd3-2fd6816e17e6
order        : 1
author       : huchaomin iisa_peter@163.com
date         : 2025-05-29 11:45:36
lastEditTime : 2025-06-03 09:36:21
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# ECMAScript 模块

ECMAScript 模块（ES Modules，简称 ESM）是在 ES6（ECMAScript 2015） 阶段正式引入的

## import.meta

`import.meta` 是一个在 ECMAScript 模块（ESM）中可用的元属性，它提供了关于当前模块的元信息

在 Node.js 中

```ts
{
  dirname: 'E:\\code\\qc-ui\\node_modules\\.vite-temp',
  filename: 'E:\\code\\qc-ui\\node_modules\\.vite-temp\\vite.config.ts.timestamp-1748489784747-2ed1685b2947d.mjs',
  resolve: [Function: resolve],
  url: 'file:///E:/code/qc-ui/node_modules/.vite-temp/vite.config.ts.timestamp-1748489784747-2ed1685b2947d.mjs'
}
```

在浏览器环境中

```ts
{
  url: "http://localhost:5173/src/components/HelloWorld.vue?t=1748489867702",
  resolve: [Function: resolve],
}
```

### resolve()

详细说明参考[https://web.nodejs.cn/en-us/docs/web/javascript/reference/operators/import.meta/resolve/](https://web.nodejs.cn/en-us/docs/web/javascript/reference/operators/import.meta/resolve/)
