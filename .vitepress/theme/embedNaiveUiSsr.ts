/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 17:12:15
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-18 00:32:39
 * @Description  :
 */
import type { App } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider, type GlobalThemeOverrides, zhCN, dateZhCN } from 'naive-ui'
import naiveUiThemeConfig from './naive-ui-theme-overrides.json'

import AppEntry from './App.vue'

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

const themeOverrides: GlobalThemeOverrides = naiveUiThemeConfig

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      {
        abstract: true,
        breakpoints: breakpointsTailwind,
        dateLocale: dateZhCN,
        inlineThemeDisabled: true,
        locale: zhCN,
        themeOverrides,
      },
      {
        default: () => [
          h(AppEntry, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle)] : null,
        ],
      },
    )
  },
})

export { NaiveUIProvider, provideCssRenderCollect }
