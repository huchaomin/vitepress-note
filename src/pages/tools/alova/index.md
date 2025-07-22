---
uuid         : 17ca79de-a680-4f5c-abd7-8e5722e48af6
order        : 0
author       : huchaomin iisa_peter@163.com
date         : 2025-06-10 15:28:20
lastEditTime : 2025-06-11 13:55:10
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# alova

## 请求类型

| 方法 | 参数 |
| --- | --- |
| Get | `alovaInstance.Get(url[, config])` |
| Post | `alovaInstance.Post(url[, data[, config]])` |
| Put | `alovaInstance.Put(url[, data[, config]])` |
| Delete | `alovaInstance.Delete(url[, data[, config]])` |
| Patch | `alovaInstance.Patch(url[, data[, config]])` |
| Head | `alovaInstance.Head(url[, config])` |
| Options | `alovaInstance.Options(url[, config])` |

## 响应流程

<img src="./响应流程.svg" alt="响应流程" style="width: 100%;">

::: warning
从上图可知， 在 hook 的 `onSuccess` 中抛出错误将会触发 hook 的 `onError`
:::

## 请求策略

### `useRequest`

- `immediate` 默认 `true`

### `useWatcher`

- `immediate` 默认 `false`
- `debounce` 防抖时间，单位毫秒，默认 `0`
- `abortLast` 是否在触发时中止上一次请求，防止请求时序混乱，默认 `true`

### `useForm` 表单提交策略

### `useAutoRequest` 自动请求策略

### `accessAction` 和 `actionDelegationMiddleware` 跨组件触发请求
