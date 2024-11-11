<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-11-02 15:23:39
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 16:51:58
 * @Description  :
-->
<script setup lang="ts">
import type { InputProps } from 'naive-ui'

export type CInputPropsType = {
  type?: 'password' | 'text' | 'textarea'
} & Omit<InputProps, 'type'>

// https://github.com/vuejs/core/issues/8286
const props = withDefaults(
  defineProps<{
    type?: 'password' | 'text' | 'textarea'
  }>(),
  {
    type: 'text',
  },
)

const bindProps = computed(() => {
  const obj: Record<string, any> = {
    clearable: true,
  }
  if (props.type === 'textarea') {
    Object.assign(obj, {
      autosize: { maxRows: 6, minRows: 2 },
      clearable: false,
      maxlength: 200,
      showCount: true,
    })
  }
  return obj
})
</script>

<template>
  <NInput placeholder="请输入" :type="type" v-bind="bindProps" show-password-on="click">
    <template v-for="k in Object.keys($slots)" :key="k" #[k]="slotScope">
      <slot :name="k" v-bind="slotScope"></slot>
    </template>
  </NInput>
</template>
