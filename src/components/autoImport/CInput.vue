<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-11-02 15:23:39
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-23 22:51:25
 * @Description  :
-->
<script setup lang="ts">
import type { InputProps } from 'naive-ui'

export type CInputPropsType = Omit<InputProps, 'type'> & {
  type?: 'password' | 'text' | 'textarea'
}

// TODO https://github.com/vuejs/core/issues/8286
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
