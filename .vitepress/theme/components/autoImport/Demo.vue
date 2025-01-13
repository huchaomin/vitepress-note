<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-11 21:40:11
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-11 23:12:16
 * @Description  :
-->
<script lang="ts" setup>
import type { Platform } from '@/markdown/preview'

import { ComponentType } from '@/constant/type'

import CodeCloseIcon from './icons/code-close.vue'
import CodeOpenIcon from './icons/code-open.vue'
import CodeSandboxIcon from './icons/codesandbox.vue'
import CopyIcon from './icons/copy.vue'
import FoldIcon from './icons/fold.vue'
import GithubIcon from './icons/github.vue'
import GitlabIcon from './icons/gitlab.vue'
import StackblitzIcon from './icons/stackblitz.vue'
import { MessageService } from './message'
import Tooltip from './tooltip/index.vue'
import { useCodeCopy } from './utils/copy'
import { useCodeFold } from './utils/fold'
import { useHighlightCode } from './utils/highlight'
import { useNameSpace } from './utils/namespace'
import { genHtmlCode } from './utils/template'

interface VitepressDemoBoxProps {
  codeplayer?: string
  codesandbox?: string
  darkTheme?: string
  description?: string
  files: string
  github?: string
  gitlab?: string
  htmlCode?: string
  lightTheme?: string
  order: string
  reactCode?: string
  reactComponent?: any
  reactCreateElement?: any // import { createElement as reactCreateElement } from 'react';
  reactCreateRoot?: any // import { createRoot as reactCreateRoot } from 'react-dom/client';
  scope?: string
  select?: ComponentType
  stackblitz?: string
  theme?: string
  title?: string
  visible?: boolean
  vueCode?: string
}

const props = withDefaults(defineProps<VitepressDemoBoxProps>(), {
  description: '描述内容',
  github: '',
  gitlab: '',
  order: 'vue,react,html',
  select: ComponentType.VUE,
  title: '默认标题',
  visible: true,
})

const activeFile = ref<string>('')
const currentFiles = computed<Record<string, string>>(() => {
  const files = JSON.parse(decodeURIComponent(props.files || '{}'))
  const result = files[type.value]
  if (result && !result[activeFile.value]) {
    activeFile.value = Object.keys(result)?.[0] || ''
  }
  return result
})

const injectType = inject('coot-code-type', {} as any)
const setInjectType = inject<(type: string) => void>('set-coot-code-type', (type: string) => {})

const type = ref<ComponentType>(ComponentType.VUE)
function setCodeType(_type: ComponentType) {
  type.value = _type
  if (typeof setInjectType === 'function') {
    setInjectType(_type)
  }
  nextTick(() => {
    // 重新计算代码块高度
    if (sourceRef.value && !isCodeFold.value) {
      sourceRef.value.style.height = `${sourceContentRef.value.scrollHeight}px`
    }
  })
}

const ns = useNameSpace()
const { isCodeFold, setCodeFold } = useCodeFold()
const { clickCopy } = useCodeCopy()

const currentCode = computed(() => {
  return props[`${type.value}Code` as keyof VitepressDemoBoxProps]
})
// 要展示的高亮代码
const displayCode = computed(() => {
  if (currentFiles.value && currentFiles.value[activeFile.value]) {
    return useHighlightCode(currentFiles.value[activeFile.value])
  }
  const code = useHighlightCode(currentCode.value)
  return code
})

const tabs = computed<ComponentType[]>(() => {
  return [ComponentType.VUE, ComponentType.REACT, ComponentType.HTML].filter(
    (item) => props[`${item}Code` as keyof VitepressDemoBoxProps],
  )
})

function clickCodeCopy() {
  clickCopy(currentCode.value || '')
  MessageService.open()
}

watch(
  () => props.select,
  (val: ComponentType) => {
    if (val && props[`${val}Code` as keyof VitepressDemoBoxProps]) {
      type.value = val
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => tabs.value,
  () => {
    if (!props[`${type.value}Code` as keyof VitepressDemoBoxProps]) {
      type.value = tabs.value[0]
    }
  },
  { deep: true, immediate: true },
)

const sourceRef = ref()
const sourceContentRef = ref()

function handleFileClick(file: string) {
  activeFile.value = file
  if (sourceRef.value) {
    sourceRef.value.style.height = 'auto'
  }
  nextTick(() => {
    sourceRef.value.style.height = `${sourceContentRef.value.scrollHeight}px`
  })
}

watch(
  () => isCodeFold.value,
  (val) => {
    nextTick(() => {
      if (sourceRef.value) {
        if (val) {
          sourceRef.value.style.height = 0
        } else {
          sourceRef.value.style.height = `${sourceContentRef.value.scrollHeight}px`
        }
      }
    })
  },
)
</script>

<template>
  <div :class="[ns.e('container')]">
    <!-- 预览区 -->
    <section class="vp-raw" :class="[ns.bem('preview')]">
      <slot v-if="type === 'vue'" name="vue"></slot>
    </section>
    <!-- 描述及切换 -->
    <section :class="[ns.bem('description')]">
      <div v-if="tabs.length > 1 && visible" :class="[ns.bem('lang-tabs')]">
        <div
          v-for="tab in tabs"
          :key="tab"
          :class="[ns.bem('tab'), type === tab && ns.bem('active-tab')]"
          @click="setCodeType?.(tab)"
        >
          {{ tab }}
        </div>
      </div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <Tooltip v-if="!isCodeFold" content="收起代码">
          <CodeCloseIcon @click="setCodeFold(true)"></CodeCloseIcon>
        </Tooltip>
        <Tooltip v-else content="展开代码">
          <CodeOpenIcon @click="setCodeFold(false)"></CodeOpenIcon>
        </Tooltip>
        <Tooltip content="复制代码">
          <CopyIcon @click="clickCodeCopy"></CopyIcon>
        </Tooltip>
      </div>
    </section>

    <!-- 代码展示区 -->
    <section ref="sourceRef" :class="[ns.bem('source')]">
      <div ref="sourceContentRef">
        <div v-if="Object.keys(currentFiles).length" :class="[ns.bem('file-tabs')]">
          <div
            v-for="file in Object.keys(currentFiles)"
            :key="file"
            :class="[ns.bem('tab'), activeFile === file && ns.bem('active-tab')]"
            @click="handleFileClick(file)"
          >
            {{ file }}
          </div>
        </div>
        <pre class="language-html"><code v-html="displayCode"></code></pre>
      </div>
    </section>

    <div v-if="!isCodeFold" :class="ns.bem('fold')" @click="setCodeFold(true)">
      <FoldIcon></FoldIcon>收起代码
    </div>
  </div>
</template>
