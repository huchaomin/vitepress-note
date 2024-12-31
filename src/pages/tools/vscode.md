---
uuid         : 5187e96b-78c1-4302-ac44-311528a12cbb
order        : 2
author       : peter peter@qingcongai.com
date         : 2024-11-25 14:23:03
lastEditTime : 2024-12-31 11:13:47
lastEditors  : huchaomin iisa_peter@163.com
description  :
---
# vscode 使用经验

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

### Toggle Quotes 插件 快捷键 `Ctrl + '` 无效

1. 命令 `editor.togglequotes` 是没有问题
2. 查看按键绑定，`Ctrl + '` 也没有被别的插件占用
3. 尝试切换一下按键绑定，改成 `Ctrl + ;`，然后再改回来。问题卡住了，`Ctrl + '` 录不进去了！！！
4. 算了，就用 `Ctrl + ;` 吧
