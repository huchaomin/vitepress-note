---
uuid         : d52168bd-6420-4e21-9986-e56cbca68e3e
order        : 5
author       : huchaomin iisa_peter@163.com
date         : 2024-12-20 10:51:03
lastEditTime : 2024-12-20 17:13:17
lastEditors  : huchaomin iisa_peter@163.com
description  :
---

# Algolia DocSearch

## 我的 new Crawler 配置

```ts
// eslint-disable-next-line no-new
new Crawler({
  actions: [
    {
      indexName: 'mulinzi_note',
      pathsToMatch: ['https://www.mulinzi.cn/**'],
      recordExtractor: ({ helpers }) => {
        return helpers
          .docsearch({
            aggregateContent: true, // 是否聚合内容,防止爬虫爬的内容过多
            indexHeadings: true, // 是否索引标题 还可以控制哪些标题级别会被索引
            recordProps: {
              content: ['.VPDoc p, .VPDoc li'],
              // lang: 'zh-Hans', // 查询结果中添加 language 属性,我确定没有看错，这两个注释都放开的话，则结果中两个属性都没了。为了防止你们逗我，我两个都不加，他会从页面html lang属性中获取
              // language: 'zh-Hans', // 查询结果中添加 lang 属性,我确定没有看错，这两个注释都放开的话，则结果中两个属性都没了。为了防止你们逗我，我两个都不加，他会从页面html lang属性中获取
              lvl0: {
                defaultValue: '木林子的笔记-记住自己的点滴',
                selectors: '.algolia_lvl0',
              },
              lvl1: ['.VPDoc h1'],
              lvl2: ['.VPDoc h2'],
              lvl3: ['.VPDoc h3'],
              lvl4: ['.VPDoc h4'],
              lvl5: ['.VPDoc h5'],
              lvl6: ['.VPDoc h6'],
            },
            recordVersion: 'v3', // 最新版本
          })
      },
    },
  ],
  apiKey: 'your api key **331e5',
  appId: 'ZHEDSTO6YB',
  discoveryPatterns: ['https://www.mulinzi.cn/**'],
  exclusionPatterns: [], // 排除的路径
  ignoreCanonicalTo: false,
  indexPrefix: '',
  initialIndexSettings: {
    mulinzi_note: {
      // 用于启用或禁用高级搜索语法。启用高级搜索语法后，用户可以在搜索查询中使用布尔运算符（如 AND、OR、NOT）和其他高级搜索功能
      advancedSyntax: true,
      // 允许数字令牌上的拼写错误,用户搜索 ‘304’，也会返回 ‘404、340等等’
      allowTyposOnNumericTokens: false,
      attributeCriteriaComputedByMinProximity: true,
      // 去重使用的属性
      attributeForDistinct: 'url',
      // 指定哪些属性可以用来进行筛选 vitepress 里面指定了 type 我感觉多余
      attributesForFaceting: ['lang'],
      // 指定在搜索结果中要高亮显示的属性
      attributesToHighlight: ['hierarchy', 'content'],
      // 指定在搜索结果中要检索的属性
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
      ],
      // 允许指定一个属性列表，Algolia 在返回搜索结果时会对这些属性进行截取，并在搜索结果中显示部分内容
      attributesToSnippet: ['*:30'],
      camelCaseAttributes: ['hierarchy', 'content'],
      // 自定义排序权重
      customRanking: [
        'desc(weight.pageRank)', // 这个暂时没有配置，页面相互之间没有权重
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      // 是否启用去重
      distinct: true,
      // 启用忽略复数功能 其中单数和复数被视为等同 (foot = feet)
      ignorePlurals: true,
      // 控制邻近排名标准的精度
      minProximity: 1,
      // 3 个单词允许 1 个拼写错误
      minWordSizefor1Typo: 3,
      // 7 个单词允许 2 个拼写错误
      minWordSizefor2Typos: 7,
      // 排名标准
      ranking: [
        'words', // 按匹配查询词的数量对结果进行排序，从匹配次数最多的开始
        'filters', // 按过滤分数对结果进行排序。如果您想使用，此选项必不可少optionalFilters。
        'typo', // 按拼写错误最少的顺序对结果进行排序。
        'attribute', // 根据您在 searchableAttributes 中设置的属性顺序对结果进行排序
        'proximity', // 根据查询词彼此之间的接近程度对结果进行排序。
        'exact', // 对于单词查询，排序取决于exactOnSingleWordQuery参数;对于多个词，按完全匹配的查询词数量对结果进行排序
        'custom', // 根据customRanking参数排序, 如果custom没有定义，customRanking则被忽略
      ],
      // 当查询未返回任何结果时，再次尝试将所有单词视为可选。这相当于将查询单词之间应用的隐式 AND 运算符转换为 OR
      removeWordsIfNoResults: 'allOptional',
      searchableAttributes: [
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
    },
  },
  // 用于控制爬取页面内容时的深度限制
  maxDepth: 20,
  // 用于控制爬取页面内容时的速率限制
  rateLimit: 8,
  // 爬取页面内容时执行 JavaScript, 对于单页面应用程序，这是必需的
  renderJavaScript: false,
  schedule: 'at 05:10 on Saturday',
  sitemaps: ['https://www.mulinzi.cn/sitemap.xml'],
  startUrls: ['https://www.mulinzi.cn'],
})
```

## 参考

- [vitepress 官方文档的algolia爬虫配置](https://vitepress.dev/reference/default-theme-search#crawler-config)
- [docsearch 官方配置文档](https://docsearch.algolia.com/docs/record-extractor)
- [algolia 官方配置文档](https://www.algolia.com/doc/)
