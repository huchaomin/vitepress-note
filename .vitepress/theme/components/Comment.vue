<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-18 09:56:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-18 17:31:27
 * @Description  :
-->
<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const isProd = import.meta.env.PROD
</script>

<template>
  <div>
    <ClientOnly>
      <Giscus
        v-if="frontmatter.uuid && isProd"
        :key="frontmatter.uuid"
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
  </div>
</template>
