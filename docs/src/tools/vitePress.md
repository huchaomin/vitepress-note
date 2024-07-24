# VitePress 介绍

## 起步

```bash
pnpm add -D vitepress
pnpx vitepress init
```

## 链接页面

```md
<!-- 链接到其他页面 -->
[Getting Started](./getting-started)
[Getting Started](../guide/getting-started)
<!-- 连接到非VitePress 页面（src 目录下其他html页面） -->
[Link to pure.html](/pure.html){target="_self"}
<!-- 链接到外部页面 -->
[Getting Started](https://vitepress.vuejs.org/guide/getting-started.html)
```

## 其他特性

- 简洁url
- rewrites 路由重写
- 动态路由：根据一md文件生成多个页面
- 渲染原始内容
