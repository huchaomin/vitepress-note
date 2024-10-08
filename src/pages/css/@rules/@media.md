# @media

## 媒体类型

| 类型   | 描述                                               |
| :----- | :------------------------------------------------- |
| all    | 适用于所有设备                                     |
| print  | 适用于在打印预览模式下在屏幕上查看的分页材料和文档 |
| screen | 主要用于屏幕                                       |
| speech | 主要用于屏幕阅读器                                 |

## 媒体特性

### any-hover 与 hover

```css
@media (any-hover: hover) {
  /* 任意的输入装置⽀持悬停 */
}
@media (any-hover: none) {
  /* 任意的输入装置不⽀持悬停 */
}
```

```css
@media (hover: hover) {
  /* 主输⼊装置⽀持悬停 */
}
@media (hover: none) {
  /* 主输⼊装置不⽀持悬停 */
}
```

### any-pointer 与 pointer

```css
@media (any-pointer: none) {
  /* 不⽀持点击 */
}
@media (any-pointer: coarse) {
  /* ⾄少⼀个装置点击不精准 */
}
@media (any-pointer: fine) {
  /* 有装置点击很精准 */
}
```

```css
@media (pointer: none) {
  /* 主输⼊装置点击不可⽤ */
}
@media (pointer: coarse) {
  /* 主输⼊装置点击不精准 */
}
@media (pointer: fine) {
  /* 主输⼊装置点击精准 */
}
```

### 暗黑模式/深色模式

```css
/* 深⾊模式 */
@media (prefers-color-scheme: dark) {}
/* 浅⾊模式 */
@media (prefers-color-scheme: light) {}
```

### 高对比度模式

```css
@media (prefers-contrast: more) {
  /* ⽤户喜欢⾼对⽐度 */
}
@media (prefers-contrast: less) {
  /* ⽤户喜欢对⽐度 */
}
```

### 减弱动画支持

```css
@media (prefers-reduced-motion: reduce) {
  /* ⽤户希望减弱动画 */
}
```

## 逻辑运算符

- `not`、`and`、`only` 和 `or` 可用于联合构造复杂的媒体查询
- 可以通过用 `,` 分隔多个媒体查询，将它们组合为一个规则
- 条件有重合部分时，范围更大的条件要写在范围更小条件之前

```css
@media screen and (min-width: 640px) and (max-width: 768px){
  /* 满足屏幕 且 宽度在640-768之间，包括等于 */
}
@media not screen and (min-width: 640px) and (max-width: 768px){
  /* 不是屏幕 或 宽度不在640-768之间，不包括等于 */
}
```

## @import 媒体查询

```css
@import url("landscape.css") screen and (orientation: landscape);
```

## `HTML` 和 `js` 中的媒体查询

```HTML
<link rel="stylesheet" href="default.css">
<link rel="stylesheet" href="mobile.css" media="(max-width: 480px)">
<style media='print'></style>
```

```HTML
<picture>
  <source srcset="rect.png" media="(min-width: 480px)">
  <img src="square.png">
</picture>
```

```ts
if (matchMedia('(max-width: 480px)').matches) {
  // js here
}
```

:::warning
在 `JS` 应用中，如果参数是 `CSS` 声明（也就是出现了冒号），外面需要有个括号，否则语法不正确，
也就是 `matchMedia('max-width:480px')` 是无效的
:::
