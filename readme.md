---
author       : peter peter@qingcongai.com
date         : 2024-12-02 09:08:46
lastEditors  : huchaomin iisa_peter@163.com
lastEditTime : 2024-12-25 16:58:53
description  :
---
# readme

## todo

- build.rollupOptions.output 好像不支持
- autoImport utils 实在不行 使[用桶文件](https://cn.vitejs.dev/guide/performance.html#avoid-barrel-files)
- [暗黑明亮切换](https://vitepress.dev/zh/guide/extending-default-theme#on-appearance-toggle)
- [生成 favicon.ico](https://vitepress.dev/zh/reference/site-config#head)
- gsap
- vite-plugin-pwa
   globPatterns <https://vite-pwa-org-zh.netlify.app/guide/service-worker-precache.html>
   <https://vite-pwa-org-zh.netlify.app/guide/pwa-minimal-requirements.html#icons-images>
- vite-plugin-markdown-preview | vitepress-demo-preview
- vitepress-plugin-sandpack
- [参考 vue3 + vite 工程](https://github.com/vitejs/awesome-vite#templates)
- [NPM](https://www.npmjs.com/search?q=vite-plugin&ranking=popularity), [社区插件列表](https://github.com/vitejs/awesome-vite#plugins), [rollup](https://www.npmjs.com/search?q=rollup-plugin&ranking=popularity)
- [Monorepo 和链接依赖](https://www.npmjs.com/search?q=rollup-plugin&ranking=popularity)
- [预热常用文件 优化](https://cn.vitejs.dev/guide/performance#warm-up-frequently-used-files)
- [虚拟模块](https://cn.vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- vite resolve.dedupe 配置 [参考](https://juejin.cn/post/7239996748318408759#heading-9)
- vite.optimizeDeps
- server.warmup 与 optimizeDeps
- [vite 插件市场，模板市场](https://github.com/vitejs/awesome-vite)
- [css @property 与 css Houdini](https://www.cnblogs.com/coco1s/p/14661268.html)
- [onUpdateXxx](https://www.naiveui.com/zh-CN/light/docs/common-issues)
- [受控模式与非受控模式](https://www.naiveui.com/zh-CN/light/docs/controlled-uncontrolled)
- [package.json 中的 resolution](https://blog.csdn.net/qq_43592064/article/details/132427625)
- npm install --save-dev seemly
- <https://vitepress.yiov.top/plugin.html>
- chokidar 文件系统监听器
- vite 组件开发 [参考](https://sugarat.top/technology/works/vitepress-plugin-announcement.html)
- `['meta', { name: 'theme-color', content: '#5f67ee' }]`,
- 评论系统错误捕获，所有类型的错误 fetch xhr vue iframe，service worker 处理
- 404页面
- 参考一下大神：<https://github.com/jynba/jynba.github.io>
- 滚动到 评论区域 提示
- IntersectionObserver

## threejs

- window.devicePixelRatio

## 参考文献

- [换行符](https://shuliqi.github.io/2020/06/06/%E5%85%B3%E4%BA%8EDelete%60CR%60eslint-prettier-prettier-%E6%8A%A5%E9%94%99%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/#%E9%97%AE%E9%A2%98%E7%9A%84%E6%8F%90%E5%87%BA),使用.editorconfig解决
- eslint-plugin-markdown [可参考这里](https://eslint.org/docs/latest/use/configure/plugins) 或官方文档
