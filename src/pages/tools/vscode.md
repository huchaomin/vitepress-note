---
uuid         : 5187e96b-78c1-4302-ac44-311528a12cbb
order        : 2
author       : peter peter@qingcongai.com
date         : 2024-11-25 14:23:03
lastEditTime : 2024-12-28 23:30:37
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
