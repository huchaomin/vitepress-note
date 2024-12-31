<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-30 17:36:03
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-31 23:42:09
 * @Description  :
-->
<script setup lang="ts">
import change_theme from '@/assets/lottie/change_theme.json?raw'
import { changeProviderTheme } from '@/plugins/naive-ui/providerProps'
import { DotLottieVue, type DotLottieVueInstance } from '@lottiefiles/dotlottie-vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const initialMode = isDark.value ? 'reverse' : 'forward'

watchEffect(() => {
  changeProviderTheme(isDark.value)
})

const dotLottieVueRef = ref<DotLottieVueInstance | null>(null)

function changeTheme() {
  const instance = dotLottieVueRef.value?.getDotLottieInstance()
  if (instance) {
    if (!instance.isPlaying) {
      instance.play()
      isDark.value = !isDark.value
    }
  }
}

function dotLottieMounted() {
  const instance = dotLottieVueRef.value!.getDotLottieInstance()
  instance!.addEventListener('complete', () => {
    instance!.setMode(isDark.value ? 'reverse' : 'forward')
  })
}
</script>

<template>
  <NButton quaternary size="large" round class="overflow-hidden" @click="changeTheme">
    <DotLottieVue
      ref="dotLottieVueRef"
      style="width: var(--n-height); height: var(--n-height);"
      :render-config="{
        autoResize: true,
      }"
      :mode="initialMode"
      :autoplay="false"
      :speed="2"
      :data="change_theme"
      @vue:mounted="dotLottieMounted"
    ></DotLottieVue>
    <div class="mask absolute h-full w-full"></div>
  </NButton>
</template>

<style scoped>
.n-button {
  --n-height: 48px;
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
