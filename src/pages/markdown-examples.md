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

::: details 折叠标题
This is a details block.
:::

::: raw
Wraps in a
<NButton>Hello World</NButton>
:::

<<< @/tools/vite.md{2-8}

<<< @/api-examples.md{2-3}

<script setup lang="ts">
  const a = import.meta.env.VITE_BASE_URL
  const b = ref('b')
</script>

```ts-vue
{{ a,b }}
```

```js
const a = test
console.log('hello')
```
