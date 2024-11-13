<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-11 14:57:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 17:31:33
 * @Description  :
-->
<script setup lang="ts">
const userStore = useUserStore(piniaInstance)

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

async function handleSubmit(): Promise<void> {
  if (formData.username === '') {
    $notify.error('请输入账户名')
    return Promise.reject()
  }
  if (formData.password === '') {
    $notify.error('请输入密码')
    return Promise.reject()
  }
  await userStore.login(formData)
}

defineExpose({
  handleSubmit,
})
</script>

<template>
  <CForm :form-data="formData" :items="formItems"></CForm>
</template>
