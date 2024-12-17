---
uuid         : da0bb1e6-c6f0-46dc-a379-d4073f9ebe53
order        : 1
author       : peter peter@qingcongai.com
date         : 2024-12-07 23:25:51
lastEditTime : 2024-12-10 15:03:48
lastEditors  : peter peter@qingcongai.com
description  :
---
# @layer

## 作用

声明了一个级联层，同一层内的规则将级联在一起，把优先级降到底部

## 语法

<!-- postcss-ignore -->

```css
@layer layer-name { rules }；
@layer layer-name;
@layer layer-name1, layer-name2, layer-name3;
// 匿名层
@layer {rules};
// 将 utilities.css 里面定义的规则全部移动到 utilities 层
@import (utilities.css) layer(utilities);
// 将 utilities.css 里面定义的规则全部移动到匿名层
@import (utilities.css) layer;
```

## 优先级

总体来说，后声明权重高

### 定义不影响权重

```css
@layer layer1, layer2;

@layer layer2 {
  button { padding: 10px; }
}

@layer layer1 {
  button { padding: 20px; }
}

/* 结果 10px: 代码从上往下读，layer1 先声明， layer2 后声明 */
```

### 重复定义后面的权重高

::: tip
重复声明某级联层的名字来向其添加 CSS 规则。这些样式将被附加到该层的末尾
:::

```css
@layer layer {
  button { padding: 10px; }
}

@layer layer {
  button { padding: 20px; }
}

/* 结果 20px, */
```

### 比非层定义的权重低

::: warning
其他不属于任何一级联层的样式将被集中到同一匿名层，并置于所有层的后部，这意味着任何在层外声明的样式都会覆盖在层内声明的样式
:::

```css
.some_button { height: 40px; }

@layer {
  .container .some_button { height: 30px; }
}
```

![layer](./layer.png)

## 嵌套层

```css
@layer framework {
  @layer layout {
    margin-block: 1px;
  }
}
```

或

```css
@layer framework.layout {
  p {
    margin-block: 1px;
  }
}
```

## important

```css
@layer layer {
  button {
    text-decoration: none !important;
  }
}
button { text-decoration: underline !important; }

/* 结果 none */
```

这里 important 权重有点反常识，请参阅[张鑫旭-理解CSS中的级联规则](https://www.zhangxinxu.com/wordpress/2022/05/deep-in-css-cascade/)

## <link> 元素引用 (开发阶段)

```html
<!-- zxx-lib.css的样式属于名为 lib 的级联层 -->
<link rel="stylesheet" href="zxx-lib.css" layer="lib">

<!-- 样式引入到一个匿名级联层中 -->
<link rel="stylesheet" href="zxx-lib.css" layer>

<!-- 以及，还有可能会对 support 函数进行扩展，使支持 media 媒体查询使用 -->
<link rel="stylesheet" href="zxx.lib.css" layer="lib" media="supports(at-rule(@layer))">
```
