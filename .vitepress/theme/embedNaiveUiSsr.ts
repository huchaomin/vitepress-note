/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 17:12:15
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-17 17:25:22
 * @Description  :
 */
import type { App } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import { useRoute } from 'vitepress'
import { NConfigProvider, type GlobalThemeOverrides, zhCN, dateZhCN } from 'naive-ui'

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

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  },
})

function provideCssRenderCollect(app: App) {
  if (import.meta.env.SSR) {
    const { collect } = setup(app)
    app.provide('css-render-collect', collect)
  }
}

const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '4px',
    fontFamily: 'var(--font-family-base)',
    fontFamilyMono: 'var(--font-family-mono)',
    infoColor: '#697FEDFF',
    infoColorHover: '#9AADFEFF',
    infoColorPressed: '#596CDBFF',
    infoColorSuppl: '#9AADFEFF',
    primaryColor: '#697FEDFF',
    primaryColorHover: '#9AADFEFF',
    primaryColorPressed: '#596CDBFF',
    primaryColorSuppl: '#9AADFEFF',
  },
}

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
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      },
    )
  },
})

export { NaiveUIProvider, provideCssRenderCollect }
