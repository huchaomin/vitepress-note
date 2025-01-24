<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-12-11 15:20:47
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-24 12:03:28
 * @Description  :
-->

<script setup lang="ts">
import '@docsearch/css'

import type { DefaultTheme } from 'vitepress/theme'

import { useData } from 'vitepress'

import AlgoliaSearchBox from './AlgoliaSearchBox.vue'

const { theme } = useData()

// to avoid loading the docsearch js upfront (which is more than 1/3 of the
// payload), we delay initializing it until the user has actually clicked or
// hit the hotkey to invoke it.
const loaded = ref(false)
const actuallyLoaded = ref(false)

function preconnect() {
  const id = 'AlgoliaPreconnect'
  const rIC = window.requestIdleCallback || setTimeout
  rIC(() => {
    const preconnect = document.createElement('link')
    preconnect.id = id
    preconnect.rel = 'preconnect'
    preconnect.href = `https://${
      ((theme.value.search?.options as DefaultTheme.AlgoliaSearchOptions) ?? theme.value.algolia)!
        .appId
    }-dsn.algolia.net`
    preconnect.crossOrigin = ''
    document.head.appendChild(preconnect)
  })
}
onMounted(() => {
  preconnect()
  const handleSearchHotKey = (event: KeyboardEvent) => {
    if (
      (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
      (!isEditingContent(event) && event.key === '/')
    ) {
      event.preventDefault()
      load()
      // eslint-disable-next-line ts/no-use-before-define
      remove()
    }
  }
  const remove = () => {
    window.removeEventListener('keydown', handleSearchHotKey)
  }
  window.addEventListener('keydown', handleSearchHotKey)
  onUnmounted(remove)
})

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement
  const tagName = element.tagName
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}

function load() {
  if (!loaded.value) {
    loaded.value = true
    setTimeout(poll, 16)
  }
}

function poll() {
  // programmatically open the search box after initialize
  const e = new Event('keydown') as any
  e.key = 'k'
  e.metaKey = true
  window.dispatchEvent(e)
  setTimeout(() => {
    if (!document.querySelector('.DocSearch-Modal')) {
      poll()
    }
  }, 16)
}
</script>

<template>
  <AlgoliaSearchBox
    v-if="loaded"
    :algolia="theme.search?.options ?? theme.algolia"
    @vue:before-mount="actuallyLoaded = true"
  ></AlgoliaSearchBox>
  <div v-if="!actuallyLoaded">
    <button
      type="button"
      aria-label="搜索文档 (Ctrl+K)"
      class="DocSearch DocSearch-Button"
      @click="load"
    >
      <span class="DocSearch-Button-Container"
        ><svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          class="DocSearch-Search-Icon"
        >
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        ><span class="DocSearch-Button-Placeholder">搜索文档</span></span
      ><span class="DocSearch-Button-Keys"
        ><kbd class="DocSearch-Button-Key"
          ><svg width="15" height="15" class="DocSearch-Control-Key-Icon">
            <path
              d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
              stroke-width="1.2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="square"
            /></svg></kbd
        ><kbd class="DocSearch-Button-Key">K</kbd></span
      >
    </button>
  </div>
</template>

<style>
/* stylelint-disable selector-class-pattern */
.DocSearch-Button {
  height: calc(var(--header-height) - 8px);
  padding: 0 var(--spacing-6) !important;
  margin-left: 0 !important;
}

.DocSearch-Container {
  width: var(--inner-width) !important;
  height: var(--inner-height) !important;
}

@media (width <= 768px) {
  body {
    &.DocSearch--active {
      #app {
        display: none;
      }

      .DocSearch-Container {
        position: static !important;
      }
    }
  }

  .DocSearch-Modal {
    width: 100% !important;
    height: 100% !important;
  }
}

.DocSearch-Form {
  background-color: var(--vp-c-white);
}

.DocSearch-Button-Key,
.DocSearch-Commands-Key {
  top: 0;
  box-shadow: var(--docsearch-key-pressed-shadow);
  transform: none !important;
}

.DocSearch-Button-Key--pressed {
  font-size: 0.7em;
  font-weight: 800;
}

[class*='DocSearch'] {
  --docsearch-primary-color: var(--vp-c-brand-1);
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-text-color: var(--vp-c-text-1);
  --docsearch-muted-color: var(--vp-c-text-2);
  --docsearch-searchbox-background: var(--vp-c-bg-soft);
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-modal-background: var(--vp-c-bg);
  --docsearch-footer-background: var(--vp-c-bg);
  --docsearch-hit-shadow: none;
  --docsearch-hit-background: var(--vp-c-default-soft);
}

.dark {
  .DocSearch-Footer {
    border-top: 1px solid var(--vp-c-divider);
  }

  .DocSearch-Form {
    background-color: var(--vp-c-default-soft);
  }

  [class*='DocSearch'] {
    --docsearch-key-gradient: transparent;
    --docsearch-searchbox-shadow: none;
    --docsearch-modal-shadow: none;
    --docsearch-footer-shadow: none;
    --docsearch-searchbox-focus-background: var(--vp-c-default-soft);
    --docsearch-hit-color: var(--vp-c-text-2);
    --docsearch-modal-background: rgb(16 16 20);
    --docsearch-key-pressed-shadow: 0 0 2px 0px var(--vp-c-text-1);
  }
}
</style>
