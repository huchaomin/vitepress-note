<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-12-04 16:58:48
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-05 10:58:13
 * @Description  :
-->

<script setup lang="ts">
import pagesImages from '@/pages/images.ts'
import assetImages from 'img/index.ts'

const props = withDefaults(
  defineProps<{
    src: string
  }>(),
  {},
)

console.log(assetImages)

const realSrc = ref('')

const promise = props.src.startsWith('img/')
  ? assetImages[`./${props.src.substring(4)}`]
  : pagesImages[`./${props.src}`]
promise().then((res) => {
  realSrc.value = res
})
</script>

<template>
  <NImage lazy :src="realSrc"></NImage>
</template>
