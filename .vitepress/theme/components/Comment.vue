<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-18 09:56:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-26 10:34:35
 * @Description  :
-->
<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

defineOptions({
  inheritAttrs: false,
})

const { frontmatter } = useData()

const isProd = import.meta.env.PROD

const showCommentInfoState = reactive({
  inView: false,
  notFound: false,
})

watch(
  () => frontmatter.value.uuid,
  () => {
    showCommentInfoState.inView = false
    showCommentInfoState.notFound = false
  },
)

watchEffect(() => {
  if (showCommentInfoState.inView && showCommentInfoState.notFound) {
    $msg.info('暂无评论，可占一楼进行评论')
  }
})

interface IErrorMessage {
  error: string
}

function handleMessage(event: MessageEvent) {
  if (
    event.origin !== 'https://giscus.app' ||
    !(typeof event.data === 'object' && event.data.giscus) ||
    !isProd
  ) {
    return
  }
  const giscusData = event.data.giscus
  if ('error' in giscusData) {
    const errorMessage: IErrorMessage = giscusData
    if (errorMessage.error === 'Discussion not found') {
      showCommentInfoState.notFound = true
    }
  }
}

window.addEventListener('message', handleMessage)

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <ClientOnly>
    <Giscus
      v-if="frontmatter.uuid && isProd"
      :key="frontmatter.uuid"
      v-bind="$attrs"
      repo="huchaomin/vitepress-note"
      repo-id="R_kgDOMZ-wiw"
      category="Announcements"
      category-id="DIC_kwDOMZ-wi84ClUQt"
      mapping="og:title"
      strict="1"
      reactions-enabled="1"
      emit-metadata="1"
      input-position="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
      crossorigin="anonymous"
      async
    ></Giscus>
  </ClientOnly>
</template>
