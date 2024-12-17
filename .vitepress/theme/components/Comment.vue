<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-17 15:37:18
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-17 16:52:36
 * @Description  :
-->
<!-- Comment.vue -->
<script lang="ts" setup>
import Gitalk from 'gitalk'
import { inBrowser, useData } from 'vitepress'
import 'gitalk/dist/gitalk.css'

const { frontmatter } = useData()

onMounted(() => {
  if (inBrowser) {
    const gitTalk = new Gitalk({
      admin: ['huchaomin'],
      clientID: 'de01e27a69cdede2a898',
      clientSecret: '47d398bbe1cb55331f915eeca89329c881137325',
      createIssueManually: true, // TODO 如果当前页面没有相应的 issue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
      id: frontmatter.value.uuid, // 可选。默认为 location.href
      labels: ['GitTalk'], // GitHub issue 标签
      owner: 'huchaomin', // GitHub repository 所有者
      repo: 'vitepress-note',
    })
    gitTalk.render('gitalk-container')
  }
})
</script>

<template>
  <div id="gitalk-container"></div>
</template>
