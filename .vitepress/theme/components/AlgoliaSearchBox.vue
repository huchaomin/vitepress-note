<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-12-11 14:56:09
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-22 23:19:41
 * @Description  :
-->
<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'

import docsearch from '@docsearch/js'
import { useData, useRoute, useRouter } from 'vitepress'

const props = defineProps<{
  algolia: DefaultTheme.AlgoliaSearchOptions
}>()

const router = useRouter()
const route = useRoute()
const { lang, site } = useData()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)

function getRelativePath(url: string) {
  const { hash, pathname } = new URL(url, location.origin)
  return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash
}

function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
  // eslint-disable-next-line ts/no-empty-object-type
  const options = Object.assign<{}, DefaultTheme.AlgoliaSearchOptions, Partial<DocSearchProps>>(
    {},
    userOptions,
    {
      container: '#docsearch',
      hitComponent({ children, hit }) {
        return {
          __v: null,
          constructor: undefined,
          key: undefined,
          props: { children, href: hit.url },
          ref: undefined,
          type: 'a',
        }
      },

      navigator: {
        navigate({ itemUrl }) {
          const { pathname: hitPathname } = new URL(window.location.origin + itemUrl)

          // router doesn't handle same-page navigation so we use the native
          // browser location API for anchor navigation
          if (route.path === hitPathname) {
            window.location.assign(window.location.origin + itemUrl)
          } else {
            router.go(itemUrl)
          }
        },
      },

      transformItems(items) {
        return items.map((item) => {
          // @ts-expect-error 自定义类型
          const lvl0TextTmp = item.lvl0Text as any[] | string
          const lvl0Text = Array.isArray(lvl0TextTmp)
            ? lvl0TextTmp.join('')
            : ((lvl0TextTmp ?? '') as string)
          if (lvl0Text !== '') {
            item.hierarchy.lvl0 = item.hierarchy.lvl0 ? lvl0Text : item.hierarchy.lvl0
            item._highlightResult.hierarchy.lvl0.value = item._highlightResult.hierarchy.lvl0.value
              ? `${lvl0Text} / ${item._highlightResult.hierarchy.lvl0.value}`
              : item._highlightResult.hierarchy.lvl0.value
            item._snippetResult.hierarchy.lvl0.value = item._snippetResult.hierarchy.lvl0.value
              ? `${lvl0Text} / ${item._snippetResult.hierarchy.lvl0.value}`
              : item._snippetResult.hierarchy.lvl0.value
          }
          return Object.assign({}, item, {
            url: getRelativePath(item.url),
          })
        })
      },
    },
  ) as DocSearchProps

  docsearch(options)
}

async function update() {
  await nextTick()
  const options = {
    ...props.algolia,
    ...props.algolia.locales!.zh,
  }
  const rawFacetFilters = options.searchParameters?.facetFilters ?? []
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]).filter(
      (f) => !f.startsWith('lang:'),
    ),
    `lang:${lang.value}`,
  ]
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters,
    },
  })
}
</script>

<template>
  <div id="docsearch"></div>
</template>
