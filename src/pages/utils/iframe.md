---
author       : huchaomin iisa_peter@163.com
date         : 2025-01-11 22:29:51
lastEditors  : huchaomin iisa_peter@163.com
lastEditTime : 2025-01-11 22:29:53
description  :
---

# iframe

```ts
function setHTMLWithScript() {
  nextTick(() => {
    if (!htmlContainerRef.value) {
      return
    }
    const iframe = htmlContainerRef.value.querySelector('iframe')
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document
    iframeDocument.open()
    const styles = document.head.querySelectorAll('style')
    const styleLinks = document.head.querySelectorAll('link[as="style"]')
    const fontLinks = document.head.querySelectorAll('link[as="font"]')
    const styleString = Array.from(styles)
      .map((style) => `<style replace="true">${style.innerText}</style>`)
      .join('\n')
    const styleLinkString = Array.from(styleLinks)
      .map((link) => link.outerHTML)
      .join('\n')
    const fontLinkString = Array.from(fontLinks)
      .map((link) => link.outerHTML)
      .join('\n')
    iframeDocument.write(
      genHtmlCode({
        code: props.htmlCode || '',
        links: `${styleLinkString}\n${fontLinkString}`,
        styles: styleString,
      }),
    )
    iframeDocument.close()
    // 监听 iframe 高度变化
    const originObserver = (observer = function () {
      requestAnimationFrame(() => {
        iframe.style.height = `${iframeDocument.body.scrollHeight}px`
        if (iframeDocument.documentElement) {
          iframeDocument.documentElement.className = document.documentElement.className
        }
        if (originObserver === observer) {
          observer()
        }
      })
    })
    observer()
  })
}
```
