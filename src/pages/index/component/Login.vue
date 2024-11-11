<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-11 14:57:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 16:40:39
 * @Description  :
-->
<script setup lang="ts">
const formData = reactive({
  password: '',
  username: '',
})

const formItems: FormItemType = [
  {
    formItemProps: {
      label: '帐户',
    },
    model: 'username',
  },
  {
    formItemProps: {
      label: '密码',
    },
    model: 'password',
    props: {
      type: 'password',
    },
  },
]
</script>

<template>
  <CForm :form-data="formData" :items="formItems"></CForm>
</template>
