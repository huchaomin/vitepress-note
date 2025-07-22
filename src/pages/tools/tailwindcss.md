---
uuid         : 364c3eb0-a0cc-4837-a815-99f0b4bf8dc0
order        : 2
author       : peter
date         : 2024-11-26 17:54:53
lastEditTime : 2025-06-01 14:07:48
lastEditors  : huchaomin iisa_peter@163.com
description  :
---
# tailwindcss

## 默认主题

[github](https://github.com/tailwindlabs/tailwindcss/blob/next/packages/tailwindcss/theme.css)


## vscode 设置

插件

- `bradlc.vscode-tailwindcss`: autocomplete, syntax highlighting, and linting
- `omkarbhede.tailwindcss-tune`: 右键单击并切换类名

setting.json

```json
{

  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": "on"
  },
  "css.format.enable": false,
  "css.validate": false
}
```

## 配套npm插件

- `prettier-plugin-tailwindcss`: 格式化 tailwindcss 类名

```ts
// prettier.config.ts
{
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/assets/tailwindcss.css', // v4 入口文件
}
```

::: tip
eslint 也有一款插件来格式化 tailwindcss，但是暂时只支持 v3 版本
:::

## 使用

### important

```html
<div class="bg-teal-500 bg-red-500!">
  <!-- ... -->
</div>
```
Generated CSS
```css
.bg-red-500\! {
  background-color: var(--color-red-500) !important;
}

.bg-teal-500 {
  background-color: var(--color-teal-500);
}
```

```css
@import 'tailwindcss' important;
```
生成的所有的 utility classes 都有 `!important` 后缀

