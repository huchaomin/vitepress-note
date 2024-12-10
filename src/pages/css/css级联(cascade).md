---
author       : peter peter@qingcongai.com
date         : 2024-12-09 10:24:13
lastEditors  : peter peter@qingcongai.com
lastEditTime : 2024-12-10 10:54:02
description  :
order        : 2
---
# css级联(cascade)

## `where()` 与 `is:()`

使用 `:where()` 选择的元素，优先级为 0

```css
p :where(a.link, button.btn) {
  color: red;
}

.link {
  color: blue; /* 权重高 */
}
```

`:is()` 元素选择器的优先级，取自优先级最高的选择器

```css
p :is(a.link, button.btn) {
  color: red; /* 0,1,2 权重高 */
}

/* 不可以覆盖 */
.link {
  color: blue; /* 0,1,0 权重低 */
}

/* 可以覆盖 */
.link.someClass {
  color: blue; /* 0,2,0 权重最高 */
}
```
