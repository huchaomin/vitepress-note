/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-25 12:28:02
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-25 17:25:01
 * @Description  :
 */

import { parse } from 'node-html-parser'

import type { MarkdownIt } from './index.ts'

export default (md: MarkdownIt) => {
  const render = md.render.bind(md)
  md.render = (
    ...args: [
      Parameters<MarkdownIt['render']>[0],
      {
        sfcBlocks: {
          scripts: {
            content: string
            contentStripped: string
            tagClose: string
            tagOpen: string
            type: string
          }[]
        }
      },
    ]
  ): string => {
    const result = render(...args)
    const root = parse(result)
    const demoArr = root.getElementsByTagName('Demo')
    if (demoArr.length === 0) {
      return result
    }
    const scriptObj = args[1].sfcBlocks.scripts[0] ?? {
      content: `<script setup lang="ts"></script>`,
      contentStripped: '',
      tagClose: '</script>',
      tagOpen: '<script setup lang="ts">',
      type: 'script',
    }
    const importStr = scriptObj.contentStripped.includes('defineClientComponent')
      ? ''
      : "import { defineClientComponent } from 'vitepress'"
    const statementArr: string[] = []
    demoArr.forEach((demo, index) => {
      statementArr.push(
        `const Demo${index} = defineClientComponent(() => {
          return import('${demo.getAttribute('src')}')
        })`,
      )
      demo.tagName = `Demo${index}`
      demo.removeAttribute('src')
    })
    const statementStr = statementArr.join('\n')
    scriptObj.contentStripped = `${importStr}\n${scriptObj.contentStripped}\n${statementStr}`
    scriptObj.content = `${scriptObj.tagOpen}\n${scriptObj.contentStripped}\n${scriptObj.tagClose}`
    args[1].sfcBlocks.scripts[0] = scriptObj
    return root.outerHTML
  }
}
