/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 17:12:15
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-31 16:18:55
 * @Description  :
 */
import type { App, Component } from 'vue'

import { setup } from '@css-render/vue3-ssr'
import {
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
} from 'naive-ui'
import { inBrowser } from 'vitepress'

import {
  changeProviderTheme,
  configProviderProps,
  dialogProviderProps,
  loadingBarProviderProps,
  messageProviderProps,
  modalProviderProps,
  notificationProviderProps,
} from './providerProps'

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

let hasQueriedDark = false
function NaiveUIProvider(AppEntry: Component) {
  return defineComponent({
    render() {
      if (!hasQueriedDark) {
        if (inBrowser) {
          hasQueriedDark = true
          changeProviderTheme(document.documentElement.classList.contains('dark'))
        }
      }
      return h(NConfigProvider, configProviderProps, {
        default: () =>
          h(NLoadingBarProvider, loadingBarProviderProps, {
            default: () =>
              h(NNotificationProvider, notificationProviderProps, {
                default: () =>
                  h(NDialogProvider, dialogProviderProps, {
                    default: () =>
                      h(NModalProvider, modalProviderProps, {
                        default: () =>
                          h(NMessageProvider, messageProviderProps, {
                            default: () => [
                              h(AppEntry, null, { default: this.$slots.default?.() }),
                              inBrowser ? null : [h(CssRenderStyle)],
                            ],
                          }),
                      }),
                  }),
              }),
          }),
      })
    },
  })
}

function provideCssRenderCollect(app: App) {
  if (!inBrowser) {
    const { collect } = setup(app)
    app.provide('css-render-collect', collect)
  }
}

export { NaiveUIProvider, provideCssRenderCollect }
