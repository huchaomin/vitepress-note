<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-19 10:49:58
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-19 11:15:09
 * @Description  :
-->

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    adjustHeight?: boolean // 默认高度跟随比例调整， false 的话就调整宽度度
    ratio: string
  }>(),
  {
    adjustHeight: true,
  },
)

const rootRef = ref<HTMLDivElement | null>(null)
const { height, width } = useElementSize(rootRef)

const style = computed(() => {
  const [w, h] = props.ratio.split('/').map(Number)
  console.log(width.value, height.value)

  if (props.adjustHeight) {
    return {
      height: `${(width.value * h) / w}px`,
    }
  } else {
    return {
      width: `${(height.value * w) / h}px`,
    }
  }
})
</script>

<template>
  <div ref="rootRef" :style="style">
    <slot></slot>
  </div>
</template>
