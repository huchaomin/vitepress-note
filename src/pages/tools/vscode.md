---
uuid         : 5187e96b-78c1-4302-ac44-311528a12cbb
order        : 5
author       : peter peter@qingcongai.com
date         : 2024-11-25 14:23:03
lastEditTime : 2025-03-03 17:29:05
lastEditors  : huchaomin iisa_peter@163.com
description  :
---
# vscode 使用经验

## 快捷键

| 快捷键 | 描述 |
| --- | --- |
| `Ctrl + ;` | toggle quote |
| `Ctrl + M` | 添加函数注释 |
| `Ctrl + Win + I` | koro1FileHeader 文件头部注释 |
| `Ctrl + Shift + E` | 在资源管理器视图中显示活动文件 |
| `Ctrl + Shift + T` | 切换单词命名方式 |
| `Ctrl + Shift + C` | macros.copyWithoutNewLine |
| `Ctrl + Shift + /` | 切换块注释 |

## command

| command | 描述 |
| --- | --- |
| `/// to-function` | 将箭头函数转换为普通函数 |
| `/// to-arrow` | 将普通函数转换为箭头函数 |
| *** | [更多请参考](https://eslint-plugin-command.antfu.me/commands/hoist-regexp) |

## 问题

### TSServer exited. Code: null. Signal: SIGTERM

[Reload with Extensions Disabled](https://github.com/microsoft/vscode/issues/191441)

### stylelint 只有在编辑器第一次打开时生效，改动文件之后不生效

初步实验是 stylelint 与 Tailwind CSS IntelliSense 插件冲突，关闭 Tailwind CSS IntelliSense 插件后 stylelint 生效。

如果想要同时使用两个插件，可以在 settings.json 中配置：

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  },
  // ...
  "stylelint.validate": [
  // ...
    "tailwindcss"
  ],
  "stylelint.snippet": [
  // ...
    "tailwindcss"
  ]
}
```

经过测试，没问题

::: warning
后面不知某个插件的某个版本更新后，这个问题不复存在了。上面的配置也不需要了。
:::

### Toggle Quotes 插件 快捷键 `Ctrl + '` 无效

1. 命令 `editor.togglequotes` 是没有问题
2. 查看按键绑定，`Ctrl + '` 也没有被别的插件占用
3. 尝试切换一下按键绑定，改成 `Ctrl + ;`，然后再改回来。问题卡住了，`Ctrl + '` 录不进去了！！！
4. 算了，就用 `Ctrl + ;` 吧
