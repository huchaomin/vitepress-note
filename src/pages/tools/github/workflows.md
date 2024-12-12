---
author       : huchaomin iisa_peter@163.com
date         : 2024-12-12 14:58:21
lastEditors  : huchaomin iisa_peter@163.com
lastEditTime : 2024-12-12 16:10:20
description  :
---

# github workflows

## actions

[官方市场](https://github.com/marketplace?type=actions)
[awesome-actions](https://github.com/sdras/awesome-actions)

## 使用 pnpm 安装和缓存你的依赖项

```yaml
name: pnpm 安装和缓存
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20]
    steps:
      - uses: actions/checkout@main
      - name: 安装 pnpm
        uses: pnpm/action-setup@master
        with:
          version: 9
      - name: 使用 node.js ${{ matrix.node-version }}
        uses: actions/setup-node@main
        with:
          node-version: ${{ matrix.node-version }}
          cache: pnpm
      - name: 安装依赖
        run: pnpm install
```
