<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-30 17:36:03
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-31 13:57:35
 * @Description  :
-->
<script setup lang="ts">
import change_theme from '@/assets/lottie/change_theme.json?raw'
import { DotLottieVue, type DotLottieVueInstance } from '@lottiefiles/dotlottie-vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const dotLottieVueRef = ref<DotLottieVueInstance | null>(null)
</script>

<template>
  <NButton quaternary size="large" @click="isDark = !isDark">
    <DotLottieVue
      ref="dotLottieVueRef"
      style="width: calc(var(--header-height) - 1px); height: calc(var(--header-height) - 1px);"
      :render-config="{
        autoResize: true,
      }"
      :speed="1"
      :data="change_theme"
    ></DotLottieVue>
    <div class="mask absolute h-full w-full"></div>
  </NButton>
</template>

<style scoped>
.n-button {
  --n-height: var(--header-height);
  --n-padding: 0;

  &:hover,
  &:focus {
    background-color: unset;

    .mask {
      background-color: var(--n-color-hover);
      transition: background-color 0.3s var(--n-bezier);
    }
  }
}
</style>
