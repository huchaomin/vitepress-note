---
uuid         : d52168bd-6420-4e21-9986-e56cbca68e3e
order        : 5
author       : huchaomin iisa_peter@163.com
date         : 2024-12-20 10:51:03
lastEditTime : 2024-12-20 11:30:34
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
              lvl0: {
                defaultValue: 'Documentation',
                selectors: '', // TODO
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
          .map((r) => {
            return {
              ...r,
              lang: 'zh-Hans',
            }
          })
      },
    },
  ],
  apiKey: 'c0328584ea02561c5e46c635aeb331e5',
  appId: 'ZHEDSTO6YB',
  discoveryPatterns: ['https://www.mulinzi.cn/**'],
  exclusionPatterns: [],
  ignoreCanonicalTo: false,
  indexPrefix: '',
  initialIndexSettings: {
    mulinzi_note: {
      advancedSyntax: true,
      allowTyposOnNumericTokens: false,
      attributeCriteriaComputedByMinProximity: true,
      attributeForDistinct: 'url',
      attributesForFaceting: ['type', 'lang'],
      attributesToHighlight: ['hierarchy', 'content', 'hierarchy_camel'],
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
        'url_without_anchor',
        'type',
      ],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content', 'hierarchy_radio'],
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      distinct: true,
      highlightPostTag: '</span>',
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      ignorePlurals: true,
      minProximity: 1,
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
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
  maxDepth: 10,
  rateLimit: 8,
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
