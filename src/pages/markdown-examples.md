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

## 可以直接写 `script` 和 `style` 标签

::: warning

1. 生产环境，如果发现不正确渲染，请检查这里
2. 在 Markdown 中使用时，`<style scoped>` 需要为当前页面的每个元素添加特殊属性，这将显著增加页面的大小。当我们需要局部范围的样式时 `<style module>` 是首选

:::

```md{2}
<script setup lang="ts">
import { useData } from 'vitepress'
const {site,  theme, page, frontmatter } = useData() // [!code focus]
</script>
<pre>{{ theme }}</pre> // [!code --]
<pre>{{ page }}</pre> // [!code ++]
<pre>{{ frontmatter }}</pre> // [!code warning]
<pre>{{ site }}</pre> // [!code error]
```

<script setup>
import { useData } from 'vitepress'
const { site, theme, page, frontmatter } = useData()
</script>

::: details site

```ts-vue
{{ site }}
```

:::

::: details theme

```ts-vue
{{ theme }}
```

:::

::: details page

```ts-vue
{{ page }}
```

:::

::: details frontmatter

<pre :class="$style.pre">
{{ frontmatter }}
</pre>

:::

<style module>
.pre {
  font-weight: bold;
  color: red;
}
</style>

::: tip 更多runtime api
Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
:::

## `::: details` 可折叠内容

::: tip
`container` 里面的解析规则和外层 `markdown` 一样
:::

## `*-vue` 可以让 `fence code` 支持 `vue` 双括号插值

参照上面的例子

## 可以直接写组件

<NButton>Hello World</NButton>

## 代码组

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
