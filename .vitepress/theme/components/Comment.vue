<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-17 15:37:18
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-17 17:47:36
 * @Description  :
-->
<!-- Comment.vue -->
<script lang="ts" setup>
import Gitalk from 'gitalk'
import { inBrowser, useData } from 'vitepress'
import 'gitalk/dist/gitalk.css'

const { frontmatter } = useData()

const gitalkContainer = ref<HTMLElement | null>(null)

watchEffect(() => {
  // 依赖要写在这里才能，被 watchEffect（同步） 监听到
  const id = frontmatter.value.uuid
  nextTick(() => {
    if (inBrowser) {
      const gitTalk = new Gitalk({
        admin: ['huchaomin'],
        clientID: 'de01e27a69cdede2a898',
        clientSecret: '47d398bbe1cb55331f915eeca89329c881137325',
        createIssueManually: true, // TODO 如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
        id, // 可选。默认为 location.href
        labels: ['GitTalk'], // GitHub issue 标签
        owner: 'huchaomin', // GitHub repository 所有者
        repo: 'vitepress-note',
      })
      gitalkContainer.value!.innerHTML = ''
      gitTalk.render(gitalkContainer.value!)
    }
  })
})
</script>

<template>
  <div ref="gitalkContainer"></div>
</template>
