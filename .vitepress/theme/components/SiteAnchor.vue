<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-12-05 15:40:49
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-05 18:20:59
 * @Description  :
-->
<script setup lang="ts">
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
</script>

<template>
  <NAnchor
    :show-rail="false"
    internal-scrollable
    :bound="86"
    offset-target="#doc-layout"
    style="
      position: sticky;
      top: 32px;
      width: 192px;
      height: auto;
      max-height: calc(100vh - 32px - 64px);
"
    type="block"
    :ignore-gap="true"
  >
    <NAnchorLink v-for="item of headers" :key="item.link" :title="item.title" :href="item.link">
      <template v-if="item.children.length">
        <NAnchorLink v-for="c of item.children" :key="c.link" :title="c.title" :href="c.link">
        </NAnchorLink>
      </template>
    </NAnchorLink>
  </NAnchor>
</template>
