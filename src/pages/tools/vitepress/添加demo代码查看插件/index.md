---
uuid         : ab93388b-7587-4be4-857f-c551dece1e07
order        : 5
author       : huchaomin iisa_peter@163.com
date         : 2025-01-27 09:14:27
lastEditTime : 2025-01-27 11:02:24
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# 添加 demo 代码查看插件

看了一下 github 上 vitepress 的插件，发现没有写的很好 demo 代码查看插件，所以自己写了一个。

## 直接上代码吧

<<< @/../../build/plugins/md/demo.ts

## 使用

```md
<Demo src="path/to/demo.vue"></Demo>
```

## 效果

<Demo src="./Demo.vue"></Demo>

## 参考

- [xinnian999](https://github.com/xinnian999/vitepress-vue-demo/blob/master/src/mdVueDemoPlugin.ts)
- [zh-lx](https://github.com/zh-lx/vitepress-demo-plugin/blob/main/packages/plugin/src/markdown/utils.ts)
