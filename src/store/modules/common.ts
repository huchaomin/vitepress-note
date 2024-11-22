/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 14:22:16
 * @Description  :
 */
import { useLoadingBar } from '@/plugins/naive-ui/discreteApi'
import type { LoadingBarApi } from 'naive-ui'

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

  return {
    loading,
    loadingCount,
    screenWidth,
  }
})
