<!--
 * @Author       : peter
 * @Date         : 2024-11-26 11:32:37
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-26 17:01:23
 * @Description  :
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content: string
  }>(),
  {},
)

const source = computed(() => props.content)
const { copied, copy, isSupported } = useClipboard({ legacy: true, source })
</script>

<template>
  <NCard class="fence_card" embedded :bordered="false" content-class="!p-0">
    <NTooltip>
      <template #trigger>
        <NButton quaternary class="copy_btn !absolute" @click="copy(source)">
          <i-material-symbols:content-copy-outline></i-material-symbols:content-copy-outline>
        </NButton>
      </template>
      <span>{{ isSupported ? (copied ? '已复制' : '复制') : '不支持复制' }}</span>
    </NTooltip>
    <NScrollbar x-scrollable>
      <slot></slot>
    </NScrollbar>
  </NCard>
</template>

<style scoped>
.copy_btn {
  top: 0;
  right: 0;
  z-index: 3;
  display: none;
}

.fence_card {
  &:hover {
    .copy_btn {
      display: flex;
    }

    :deep() {
      span.lang {
        display: none;
      }
    }
  }
}
</style>
