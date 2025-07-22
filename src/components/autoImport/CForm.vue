<!--
* @Author       : huchaomin
* @Date         : 2023-10-08 15:13:29
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-23 22:51:37
* @Description  :
-->
<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import type { CInputPropsType } from '@/components/autoImport/CInput.vue'
import type { FormInst, FormItemProps } from 'naive-ui'

export type FormItemType = (itemComponent | itemSlot)[]

type componentType = 'CInput'

interface itemCommon {
  formItemProps?: FormItemProps
  show?: boolean
}

type itemComponent<T extends componentType = 'CInput'> = {
  component?: T // 组件名称
  model: string // 组件 v-model:value 绑定的值
  props?: CInputPropsType // TODO 组件属性
} & itemCommon

type itemSlot = {
  model?: string // 组件 v-model:value 绑定的值
  slot: string
} & itemCommon

const props = withDefaults(
  defineProps<{
    formData: Record<string, any>
    items: FormItemType
    labelPlacement?: 'left' | 'top'
  }>(),
  {
    labelPlacement: 'top',
  },
)
const formRef = ref<FormInst | null>(null)

// TODO
function validate(useReject = false): Promise<void> {
  return new Promise((resolve, reject) => {
    formRef.value!.validate().then(
      () => {
        resolve()
      },
      (err) => {
        if (useReject) {
          reject(err)
        }
      },
    )
  })
}

const computedItems = computed(() => {
  return props.items
    .filter((i) => {
      return i.show !== false
    })
    .map((item) => {
      return {
        ...item,
        component: (item as itemSlot).slot
          ? undefined
          : ((item as itemComponent).component ?? 'CInput'),
        formItemProps: {
          path: item.model,
          ...(item.formItemProps ?? {}),
        },
      }
    })
})

defineExpose({
  formRef,
  validate,
})
</script>

<template>
  <NForm
    ref="formRef"
    label-width="auto"
    :label-align="labelPlacement === 'left' ? 'right' : 'left'"
    :label-placement="labelPlacement"
    :model="formData"
    show-require-mark
  >
    <NFormItem
      v-for="item in computedItems"
      :key="(item as itemSlot).slot ?? item.model"
      v-bind="item.formItemProps"
      :class="item.formItemProps!.label === undefined ? 'no_label_item' : ''"
    >
      <slot v-if="(item as itemSlot).slot" :name="(item as itemSlot).slot"></slot>
      <CInput
        v-else-if="(item as itemComponent).component === 'CInput'"
        v-model:value="formData[(item as itemComponent).model]"
        v-bind="(item as itemComponent).props"
      >
      </CInput>
    </NFormItem>
  </NForm>
</template>
