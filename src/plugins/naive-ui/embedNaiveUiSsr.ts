/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 17:12:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 18:21:03
 * @Description  :
 */
import type { App, Component } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import configProviderProps from './configProviderProps'

const CssRenderStyle = defineComponent({
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    })
  },
  setup() {
    const collect: () => string = inject('css-render-collect')!
    return {
      style: collect(),
    }
  },
})

function provideCssRenderCollect(app: App) {
  if (import.meta.env.SSR) {
    const { collect } = setup(app)
    app.provide('css-render-collect', collect)
  }
}

function NaiveUIProvider(AppEntry: Component) {
  return defineComponent({
    render() {
      return h(NConfigProvider, configProviderProps, {
        default: () => [
          h(AppEntry, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle)] : null,
        ],
      })
    },
  })
}

export { NaiveUIProvider, provideCssRenderCollect }
