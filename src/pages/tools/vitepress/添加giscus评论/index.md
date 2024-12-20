---
uuid         : 1224c000-efcb-4cd0-b75a-bf38a4f859af
order        : 4
author       : huchaomin iisa_peter@163.com
date         : 2024-12-18 14:51:46
lastEditTime : 2024-12-20 11:01:02
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# 添加 giscus 评论

## 配置 giscus

1. 仓库是公开的，否则访客将无法查看 discussion
2. [giscus](https://github.com/apps/giscus) app 已安装，否则访客将无法评论和回应,安装后的结果如下
  ![giscus安装结果](./giscus安装结果.png)
3. 仓库的 discussions 功能已启用，否则访客将无法评论和回应
  ![discussions功能已启用](./discussions功能已启用.png)
4. 打开[giscus 官网](https://giscus.app/zh-CN)
5. 填写仓库：`owner/repo`，例如：`huchaomin/vitepress`
6. 页面 与 discussion 映射关系，勾选 pathname， 建议勾选'使用严格的标题匹配'
7. discussion 分类 按照推荐选择 announcements
8. 只搜索该分类中的 discussion 建议勾选
9. 特性建议全部勾上

然后你就在 '启用 giscus' 下面看到你的配置了

## 安装 vue 组件

```bash
pnpm add @giscus/vue
```

## 创建 giscus 组件, 并把上述配置传到vue组件中，并在页面中使用

<<< @/../../.vitepress/theme/components/Comment.vue

## 本博客配置

### 如上，我这里使用的与上述步骤生成的有一点不同

1. `mapping:'og:title'`

因为我把我的页面的 uuid 作为 og:title 的 content 传给了 giscus，这样就可以在 giscus 中通过 og:title 来查找对应的 discussion

```ts
// enhanceApp 方法里面
router.onAfterRouteChanged = (to: string) => {
  if (inBrowser) {
    const uuid = router.route.data.frontmatter.uuid as string | undefined
    if (uuid) {
      let meta = document.querySelector('meta[property="og:title"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', 'og:title')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', uuid)
    }
  }
}
```

推荐大家也这样做，第六步其他选项 pathname、URL、title 大部分情况下没有问题<br>
但如果你想给你的博客页面移动一下位置，导致你的url变了，那么你的评论就找不到了。 <br>
上一篇：[添加gitalk评论](../添加gitalk评论/index.md) 也有这个问题，至于怎么生成 uuid, 可以看这个博客的源码，写的不好可以使用这个评论喷我

### 动态插入 `og:title` 不能这么写

```ts
function transformHead({ pageData }) {
  const uuid = pageData.frontmatter.uuid as string | undefined
  if (uuid) {
    return [
      [
        'meta',
        {
          content: uuid,
          property: 'oa:title',
        },
      ],
    ]
  }
}
```

这样写是不行的，因为这个函数只会在页面加载的时候执行一次，而不会在页面切换的时候执行，所以不会动态更新 `og:title` 的值
