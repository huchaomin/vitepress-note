# Markdown Extension Examples

## 使用图标

```html
<i-carbon-accessibility/>
<i-custom-aaa/> // 自定义图标
```

<div class="flex gap-1">
  <i-carbon-accessibility/>
  <i-custom-aaa/>
</div>

## 折叠展示

::: details 点我查看代码

```js
console.log('Hello, VitePress!')
console.log('Hello, VitePress!')
console.log('Hello, VitePress!')
```

:::

## 可以直接写 `script` 和 `style` 标签

::: warning
请注意，这里的 `script` 和 `style` 标签是直接插入到页面中的，不会被 `markdown-it` 渲染。<br>
实测：生产环境，展示可能有问题，开发环境正常
:::

```md{1}
<script setup>
import { useData } from 'vitepress'

const {site,  theme, page, frontmatter } = useData() // [!code focus]
</script>

## Results // [!code highlight]

<pre>{{ theme }}</pre> // [!code --]
<pre>{{ page }}</pre> // [!code ++]

### Page Frontmatter // [!code error]
<pre>{{ frontmatter }}</pre> // [!code warning]
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Theme Data

::: v-pre
{{ theme }}
:::

::: js-vue
{{ theme }}
:::

<pre>{{ site }}</pre>

## 可以直接写组件

<NButton>Hello World</NButton>
