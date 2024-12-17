---
uuid         : 2d6b1c06-7bff-4ff1-8e7d-5982457b287f
order        : 2
author       : peter peter@qingcongai.com
date         : 2024-12-10 10:24:46
lastEditTime : 2024-12-10 15:58:00
lastEditors  : peter peter@qingcongai.com
description  :
---
# 自定义 vitepress 的 container_code-group

## 先看看 `vitepress` 的源码

```js
function createCodeGroup(options, md) {
  return [
    container_plugin,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid$1(5)
          let tabs = ''
          let checked = 'checked'
          for (let i = idx + 1; !(tokens[i].nesting === -1 && tokens[i].type === 'container_code-group_close'); ++i) {
            const isHtml = tokens[i].type === 'html_block'
            if ((tokens[i].type === 'fence' && tokens[i].tag === 'code') || isHtml) {
              const title = extractTitle(
                isHtml ? tokens[i].content : tokens[i].info,
                isHtml
              )
              if (title) {
                const id = nanoid$1(7)
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label data-title="${md.utils.escapeHtml(title)}" for="tab-${id}">${title}</label>`
                if (checked && !isHtml)
tokens[i].info += ' active'
                checked = ''
              }
            }
          }
          return `<div class="vp-code-group${getAdaptiveThemeMarker(
            options
          )}"><div class="tabs">${tabs}</div><div class="blocks">
`
        }
        return `</div></div>
`
      }
    }
  ]
}
```

### 代码分析

1. `token type` 的开始和结束是 `container_code-group_open` 和 `container_code-group_close`
2. 拿到这两个 `token` 之间的所有 `token`，然后根据他们 `token` 的类型来判断是 `fence` 和 `html_block`
3. 获取 `title`，然后生成 `tabs` 和 `blocks`，最后返回 `html` 字符串

## 自定义 `code_group`

1. 由于我是用 `naive-ui` 来做的主题，所以这种 `tab` 切换的效果我是用 `naive-ui` 的 `n-tabs` 来实现的
2. 但是 `n-tabs` 是需要 `n-tab-pane` 来配合使用的，
  所以我需要包裹在 `container_code-group_open` 和 `container_code-group_close`
  里面的 `fence` 和 `html_block` token，然后生成 `n-tab-pane` 的 `html` 字符串
3. 由于本人水平实在有限，没有认真研究 `markdown-it` 里面的 `ruler/token` 的用法，
  （不知道 `Ruler.before/after` 能不能够实现）
4. 已下是我变通的实践

<<< @/../../build/plugins/md/container_code_group.ts

### 代码解释

1. 找到所有的直接子 `token`（看上面的源码也就知道只有`fence` 和 `html_block`两种）
2. 根据子 `token` 来生成 `tab title`, 并设置给 `token` 的 `tabName attr`

## 自定义 `html_block` 和 `fence`

有 `tabName attr`，就用 `n-tab-pane` 包裹

### `html_block`

<<< @/../../build/plugins/md/html_block.ts

### `fence`

<<< @/../../build/plugins/md/fence.ts

## 结果

```md
::: code-group
<h1 data-title="我是标题">这里是html_block</h1>

\```ts-vue [frontmatter]
{{ $frontmatter }}
\```

:::
```

::: code-group

<h1 data-title="我是标题">这里是html_block</h1>

```ts-vue [frontmatter]
{{ $frontmatter }}
```

:::
