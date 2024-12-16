/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-16 14:14:50
 * @Description  :
 */
import type { LoadingBarApi } from 'naive-ui'

import { useLoadingBar } from '@/plugins/naive-ui/discreteApi'
import { inBrowser } from 'vitepress'

export default defineStore('common', () => {
  // 全局加载状态
  const loading = ref(false)
  const loadingCount = ref(0)
  watch(loadingCount, (val) => {
    loading.value = val > 0
  })
  let loadingBar: LoadingBarApi | null = null
  watch(loading, (val) => {
    if (!inBrowser) {
      return
    }
    if (loadingBar === null) {
      loadingBar = useLoadingBar()
    }
    if (val) {
      loadingBar.start()
    } else {
      loadingBar.finish()
    }
  })
  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const showLeftDrawer = ref(!(inBrowser && (isTablet.value || isMobile.value)))

  return {
    loading,
    loadingCount,
    screenHeight,
    screenWidth,
    showLeftDrawer,
  }
})
