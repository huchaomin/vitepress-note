---
uuid         : f68696fa-7814-48f3-aa06-c65b66915d6c
order        : 0
author       : peter peter@qingcongai.com
date         : 2024-12-10 10:24:20
lastEditTime : 2024-12-10 11:43:23
lastEditors  : peter peter@qingcongai.com
description  :
---
# css 变量

## 声明

- 用 `--` 开头
- 值可以是任何类型，包括颜色、长度、字体大小、百分比等
- 变量名大小写敏感，`--header-color` 和 `--Header-Color` 是两个不同变量

```css
:root {
  --main-color: #4d4e53;
  --main-bg: var(--main-color);
  --main-bg1: var(--main-color1, #fff);
  --main-bg2: rgb(255 0 0 / var(--opacity, 0.8));
  --base-line-height: 1.428;
  --transition-duration: 0.35s;
  --external-link: 'external link';
  --margin-top: calc(2vh + 20px);
}
```

## var() 函数

- 用于读取变量
- 第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

  ```css
  /* 第二个参数不处理内部的逗号或空格，都视作参数的一部分 */
  --font: var(--font-stack, 'Roboto', 'Helvetica'); /* 不要认为有第三个参数 */
  --pad: var(--pad, 10px 15px 20px);
  ```

- 可以用在变量的声明，如上
- 只能用作属性值，不能用作属性名

## 变量值的类型

1. 如果是字符串，可以与其他字符串拼接

   ```css
    :root {
      --bar: 'hello';
      --foo: var(--bar) ' world';
    }

    body::after {
      content: '--screen-category : 'var(--screen-category, 'some content');
    }

   ```

2. 如果变量值是数值，不能与数值单位直接连用。

   ```css
    .foo {
      --gap: 20;

      /* 无效 */
      margin-top: var(--gap) px;

      /* 有效 */
      margin-top: calc(var(--gap) * 1px);
    }
   ```

3. 如果变量值带有单位，就不能写成字符串

   ```css
    /* 无效 */
    .foo {
      --foo: '20px';

      font-size: var(--foo);
    }

    /* 有效 */
    .foo1 {
      --foo: 20px;

      font-size: var(--foo);
    }
   ```

## 作用域

与 CSS 的"层叠"（cascade）规则是一致的

## JavaScript 操作

```ts
// 设置变量
document.body.style.setProperty('--primary', '#7F583F')

// 读取变量
document.body.style.getPropertyValue('--primary').trim()

// 删除变量
document.body.style.removeProperty('--primary')
```

例

```ts
const docStyle = document.documentElement.style

document.addEventListener('mousemove', (e) => {
  docStyle.setProperty('--mouse-x', e.clientX)
  docStyle.setProperty('--mouse-y', e.clientY)
})
```
