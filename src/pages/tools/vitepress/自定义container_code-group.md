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
