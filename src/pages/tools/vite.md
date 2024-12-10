---
author       : peter peter@qingcongai.com
date         : 2024-11-25 14:25:34
lastEditors  : peter peter@qingcongai.com
lastEditTime : 2024-12-10 10:55:12
description  :
order        : 2
---
# 使用vite构建自己的前端应用

## 功能

### JSON

JSON 可以被直接导入 —— 同样支持具名导入

```ts
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example2.json'
// 导入整个对象
import json from './example.json'
```

### 动态导入

```ts
// 变量仅代表一层深的文件名。如果 file 是 foo/bar，导入将会失败
const module = await import(`./dir/${file}.js`)
```

## 环境变量和模式

### import.meta.env.MODE

应用运行的模式，可以通过 `--mode <xxx>` 指定，然后加载对应的 `.env.xxx` 文件
默认情况下, `dev` 命令 运行在 `development` 模式，而 `build` 命令则运行在 `production` 模式

### NODE_ENV

与 `MODE` 的没有丝毫关系，是两个不同的概念
会影响 `PROD` 和 `DEV` 的行为

| Command              | import.meta.env.PROD | import.meta.env.DEV |
| -------------------- | -------------------- | ------------------- |
| NODE_ENV=production  | true                 | false               |
| NODE_ENV=development | false                | true                |
| NODE_ENV=other       | false                | false               |

可以在命令行中设置，也可以在env文件中设置

```bash
NODE_ENV=development vite build
```

::: tip
命令中使用 `NODE_ENV=...` 的主要好处是，它允许 Vite 提前检测到该值, 该值的重要性最高，不需要等待读取 `env` 文件之后才拿到该值
:::

## ssr

### import.meta.url

::: warning 无法在 SSR 中使用
因为 import.meta.url 在浏览器和 Node.js 中有不同的语义。服务端的产物也无法预先确定客户端主机 URL。
:::

## 参考资料

- [vitesse](https://github.com/antfu-collective/vitesse)
- unplugin-vue-router 和 vite-plugin-vue-layouts 可以不用自己写路由
- vite-plugin-webfont-dl 自动处理字体
