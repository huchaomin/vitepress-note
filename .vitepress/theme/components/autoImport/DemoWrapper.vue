<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-26 09:27:16
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-26 14:34:33
 * @Description  :
-->

<script setup lang="ts">
const showModal = ref(false)
const scrollbarRef = ref<ComponentPublicInstance | null>(null)
const codeElement = ref<HTMLElement | null>(null)
const lineNumbersWrapper = ref<HTMLElement | null>(null)
watchEffect(() => {
  if (showModal.value) {
    nextTick(() => {
      const parent = scrollbarRef.value!.$el.parentElement
      codeElement.value = parent.querySelector('.vp-code')
      lineNumbersWrapper.value = parent.querySelector('.line-numbers-wrapper')
    })
  }
})
const { width: codeWidth } = useElementSize(codeElement)
const { width: lineNumbersWrapperWidth } = useElementSize(lineNumbersWrapper)
</script>

<template>
  <NCard class="demo_wrapper_card" :class="isMobile ? '-mx-3 !w-auto' : ''">
    <NTooltip>
      <template #trigger>
        <NButton quaternary class="show_code_btn !absolute" @click="showModal = true">
          <i-material-symbols:code></i-material-symbols:code>
        </NButton>
      </template>
      <span>查看代码</span>
    </NTooltip>
    <NScrollbar x-scrollable>
      <slot></slot>
    </NScrollbar>
    <NModal
      v-model:show="showModal"
      title="查看代码"
      :draggable="{
        bounds: 'none',
      }"
      :style="{
        width: `${codeWidth + lineNumbersWrapperWidth}px`,
        minWidth: '720px',
        maxWidth: '90vw',
      }"
      preset="card"
      size="small"
      content-class="demo_fence_modal !p-0"
    >
      <NScrollbar ref="scrollbarRef" style="max-height: 90vh;">
        <slot name="source"></slot>
      </NScrollbar>
    </NModal>
  </NCard>
</template>

<style scoped>
.show_code_btn {
  top: 0;
  right: 0;
  z-index: 3;
}
</style>
