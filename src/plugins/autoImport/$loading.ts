/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-11-05 11:29:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 15:37:49
 * @Description  :
 */
import type { LoadingBarApi, MessageReactive, ModalReactive } from 'naive-ui'
import type { VNodeChild } from 'vue'

import { useLoadingBar } from '@/plugins/naive-ui/discreteApi'
import { inBrowser } from 'vitepress'

interface LoadingShowOptions {
  content?: (() => VNodeChild) | string
  lockScreen?: boolean
}

class LoadingService {
  private static content: LoadingShowOptions['content']
  private static loadingCount = 0
  private static lockScreen: LoadingShowOptions['lockScreen'] = false
  private static message: MessageReactive | null = null
  private static modal: ModalReactive | null = null
  private readonly loading: LoadingBarApi

  constructor() {
    this.loading = useLoadingBar()
  }

  private static updateLoading(instance: LoadingService, count: number) {
    if (count > 0) {
      if (this.loadingCount === 0) {
        instance.loading.start()
      }
      if (this.content !== undefined) {
        if (this.message === null) {
          this.message = $msg.loading(this.content, {
            duration: 0,
          })
        }
        this.message.content = this.content
      }
      if (this.lockScreen) {
        if (this.modal === null) {
          this.modal = $modal({
            class: 'loading_modal',
            style: {
              display: 'none',
            },
            trapFocus: false,
          })
        }
      }
    } else {
      instance.loading.finish()
      if (this.message !== null) {
        this.message.destroy()
        this.message = null
      }
      if (this.modal !== null) {
        this.modal.destroy()
        this.modal = null
      }
      this.content = undefined
      this.lockScreen = false
    }
    this.loadingCount = count
  }

  hide() {
    if (!inBrowser) {
      return
    }
    // 等待动画结束
    setTimeout(() => {
      LoadingService.updateLoading(this, LoadingService.loadingCount - 1)
    }, 300)
  }

  show(options: LoadingShowOptions = {}) {
    if (!inBrowser) {
      return
    }
    LoadingService.content = options.content ?? LoadingService.content
    LoadingService.lockScreen = options.lockScreen ?? LoadingService.lockScreen
    LoadingService.updateLoading(this, LoadingService.loadingCount + 1)
  }
}

export default new LoadingService()
