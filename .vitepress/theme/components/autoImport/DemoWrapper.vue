<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-26 09:27:16
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-26 15:56:11
 * @Description  :
-->

<script setup lang="ts">
const showSource = ref(false)
const scrollbarRef = ref<ComponentPublicInstance | null>(null)
const codeElement = ref<HTMLElement | null>(null)
const lineNumbersWrapper = ref<HTMLElement | null>(null)
watchEffect(() => {
  if (showSource.value) {
    nextTick(() => {
      if (scrollbarRef.value === null) {
        return
      }
      const parent = scrollbarRef.value!.$el.parentElement
      codeElement.value = parent.querySelector('.vp-code')
      lineNumbersWrapper.value = parent.querySelector('.line-numbers-wrapper')
    })
  }
})
const { width: codeWidth } = useElementSize(codeElement)
const { width: lineNumbersWrapperWidth } = useElementSize(lineNumbersWrapper)
const isDropdownMode = computed(() => {
  return isMobile.value || isTablet.value
})
</script>

<template>
  <NCard
    class="demo_wrapper_card"
    :class="isMobile ? '-mx-3 !w-auto' : ''"
    :content-class="isDropdownMode ? '!p-0' : ''"
    :embedded="isDropdownMode"
    :bordered="!isDropdownMode"
  >
    <template v-if="isDropdownMode">
      <NButton tertiary block @click="showSource = !showSource">
        <i-material-symbols:keyboard-double-arrow-down-rounded></i-material-symbols:keyboard-double-arrow-down-rounded>
      </NButton>
      <NCollapseTransition class="demo_fence_collapse" :show="showSource">
        <slot name="source"></slot>
      </NCollapseTransition>
    </template>
    <template v-else>
      <NTooltip>
        <template #trigger>
          <NButton quaternary class="show_code_btn !absolute" @click="showSource = !showSource">
            <i-material-symbols:code></i-material-symbols:code>
          </NButton>
        </template>
        <span>查看代码</span>
      </NTooltip>
      <NModal
        v-model:show="showSource"
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
    </template>
    <div
      :class="{
        'p-3': isDropdownMode,
      }"
    >
      <slot></slot>
    </div>
  </NCard>
</template>

<style scoped>
.show_code_btn {
  top: 0;
  right: 0;
  z-index: 3;
}
</style>
