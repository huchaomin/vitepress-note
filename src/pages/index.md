---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'My Awesome Project'
  text: 'A VitePress Site'
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

# test

::: raw
Wraps in a
:::

<<< @/tools/vite.md{2-8}

<<< @/api-examples.md{2-3}

<script setup lang="ts">
  const a = import.meta.env.VITE_BASE_URL
  const b = ref('b')
</script>

<Text></Text>
<Text3></Text3>

```ts-vue
{{ a,b }}
```

```js
const a = test
console.log('hello')
```
