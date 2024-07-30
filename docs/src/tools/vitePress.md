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
[Getting Started](../guide/getting-started#heading)
<!-- 连接到非VitePress 页面（src 目录下其他html页面） -->
[Link to pure.html](/pure.html){target="_self"}
<!-- 链接到外部页面 -->
[Getting Started](https://vitepress.vuejs.org/guide/getting-started.html)
```

## Markdown 扩展

- 自定义标题的 id或渲染
- YAML 格式的 frontmatter 开箱即用
- 目录表 (TOC) （可以使用 markdown.toc 选项配置 TOC 的呈现效果）
- 自定义容器
- 代码高亮、聚焦、颜色差异、行号
- 导入代码片段
- 代码组, 可以左右切换代码片段
- 支持从md文件中导入其他md文件
- 在 Markdown 使用 Vue

  ```md
  ---
  hello: world
  ---

  <script setup>
  import { ref } from 'vue'
  import CustomComponent from '../../components/CustomComponent.vue'

  const count = ref(0)
  </script>

  ## Markdown Content

  # 我是一个带着组件的标题 <Tag/>

  <CustomComponent />

  The count is: {{ count }}

  <button :class="$style.button" @click="count++">Increment</button>

  <style module>
  .button {
    color: red;
    font-weight: bold;
  }
  </style>

  ```

  ::: warning
  只能有一个 `<script setup>` 和 `<style module>` 块
  :::

  ::: warning
  确保自定义组件的名称包含连字符或采用 PascalCase。否则，它将被视为内联元素并包裹在 `<p>` 标签内，这将导致激活不匹配，因为 `<p>` 不允许将块元素放置在其中
  :::

  - 可以在 md 中转义 content, 也可以在代码块中不转义 content
  - 使用 teleport 传递组件内容

## 暴露的api 与 全局变量

api

- useData
- withBase

全局变量

- $frontmatter
- $params

## 其他特性

- 简洁url
- rewrites 路由重写
- 动态路由：根据一md文件生成多个页面
- 渲染原始内容
