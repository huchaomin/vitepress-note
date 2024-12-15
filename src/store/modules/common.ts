/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-15 22:13:01
 * @Description  :
 */
import type { LoadingBarApi } from 'naive-ui'

import { useLoadingBar } from '@/plugins/naive-ui/discreteApi'

export default defineStore('common', () => {
  // 全局加载状态
  const loading = ref(false)
  const loadingCount = ref(0)
  watch(loadingCount, (val) => {
    loading.value = val > 0
  })
  let loadingBar: LoadingBarApi | null = null
  watch(loading, (val) => {
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
  const showLeftDrawer = ref(false)

  return {
    loading,
    loadingCount,
    screenWidth,
    showLeftDrawer,
  }
})
