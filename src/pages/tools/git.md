---
uuid         : 0ad13595-c456-4c1c-b26d-46d4f2b7c8db
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-02-06 14:27:58
lastEditTime : 2025-02-06 14:29:05
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# git

## 全局配置

### 不忽略大小写

```bash
git config --global core.ignorecase false
```

### 换行符问题

```bash
git config --global core.autocrlf true/input/false
```

- `true`：git提交代码时会自动将CRLF转换为LF，在检出代码时会将LF转换成CRLF
- `input`：在提交代码时，将CRLF转换成LF；检出代码时不转换
- `false`：不做任何转换

```bash
git config --global core.safecrlf true/false/warn
```

- `true`：代码中同时包含两种不同的换行格式会被禁止提交
- `false`：（默认）允许提交包含混合换行符的文件
- `warn`：提交包含混合换行符的文件时给出警告

## .gitattributes

```bash
* text=auto eol=lf
```

1. `*`：通配符
2. `text=auto`：自动检测文件是否为文本文件，如果是文本文件，Git 会启用换行符转换；如果是二进制文件（如图片、压缩包），则不做处理
3. `eol=lf`：强制使用 LF（Line Feed）作为换行符，
    - 提交到仓库时：将工作区的换行符（如 Windows 的 CRLF）转换为 LF 存储
    - 检出到工作区时：保持 LF 换行符，不根据操作系统自动转换（例如，在 Windows 上也不会转为 CRLF）

::: tip 关于换行符问题的最终配置
上述 .gitattributes 里面的配置高于 core.autocrlf 配置。
所以工程里面只需添加一个 .gitattributes 文件并将上述配置写上去即可
:::
