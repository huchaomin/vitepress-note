---
# https://vitepress.dev/reference/default-theme-home-page

header: false
---

# test

::: raw
Wraps in a
:::

<NButton>Hello World</NButton>

<i-carbon-accessibility/>
<i-custom-aaa/>

<<< @/tools/vite.md{2-8}

<<< @/api-examples.md{2-3}

<script setup lang="ts">
  const a = import.meta.env.VITE_BASE_URL
  const b = ref('b')
</script>

<Text></Text>

```ts-vue
{{ a,b }}
```

```js
const a = test
console.log('hello')
```
