/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-17 17:12:15
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-11 00:24:05
 * @Description  :
 */
import type { App, Component } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import {
  NConfigProvider,
  NLoadingBarProvider,
  NNotificationProvider,
  NDialogProvider,
  NModalProvider,
  NMessageProvider,
} from 'naive-ui'
import {
  configProviderProps,
  loadingBarProviderProps,
  notificationProviderProps,
  dialogProviderProps,
  modalProviderProps,
  messageProviderProps,
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
                              import.meta.env.SSR ? [h(CssRenderStyle)] : null,
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

export { NaiveUIProvider, provideCssRenderCollect }
