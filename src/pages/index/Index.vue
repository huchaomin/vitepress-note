<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-18 17:28:28
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-19 22:28:50
 * @Description  :
-->
<script setup lang="ts">
import { BorderBox11 } from '@kjgl77/datav-vue3'

const rootRef = ref<HTMLDivElement | null>(null)
const { height, width } = useElementSize(rootRef)

const ratio = '16/9'

const classStr = computed(() => {
  const [w, h] = ratio.split('/').map(Number)
  if (height.value > (width.value * h) / w) {
    return 'w-full'
  } else {
    return 'h-full'
  }
})
</script>

<template>
  <div ref="rootRef" class="flex h-screen w-screen items-center justify-center">
    <div :class="classStr" :style="{ aspectRatio: ratio }">
      <BorderBox11 ref="dvBorder11" title="dv-border-box-11" :title-width="400">
        <div dv-bg>dv-border-box-11</div>
      </BorderBox11>
    </div>
  </div>
</template>
