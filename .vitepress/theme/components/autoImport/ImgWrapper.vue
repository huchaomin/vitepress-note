<!--
 * @Author       : peter
 * @Date         : 2024-12-04 16:58:48
 * @LastEditors  : peter
 * @LastEditTime : 2024-12-09 15:04:42
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

const realSrc = ref('')

const promise = props.src.startsWith('img/')
  ? assetImages[`./${decodeURI(props.src.substring(4))}`]
  : pagesImages[`./${decodeURI(props.src)}`]
promise().then((res) => {
  realSrc.value = res
})
</script>

<template>
  <NImage lazy :src="realSrc"></NImage>
</template>
