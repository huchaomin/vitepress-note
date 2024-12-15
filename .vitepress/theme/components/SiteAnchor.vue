<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-12-05 15:40:49
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-15 13:06:09
 * @Description  :
-->
<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

interface HeaderItem {
  children: HeaderItem[]
  link: string
  title: string
}

withDefaults(
  defineProps<{
    headers: HeaderItem[]
  }>(),
  {},
)

const nAnchorRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  autoAnimate(nAnchorRef.value!)
})
</script>

<template>
  <NAnchor
    internal-scrollable
    :bound="72"
    offset-target="#doc-layout"
    class="site_anchor !sticky p-4 pl-0"
    style="top: 0; max-height: calc(100vh - var(--header-height));"
    :ignore-gap="true"
  >
    <div ref="nAnchorRef">
      <NAnchorLink v-for="item of headers" :key="item.link" :title="item.title" :href="item.link">
        <template v-if="item.children.length">
          <NAnchorLink v-for="c of item.children" :key="c.link" :title="c.title" :href="c.link">
          </NAnchorLink>
        </template>
      </NAnchorLink>
    </div>
  </NAnchor>
</template>
