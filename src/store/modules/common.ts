/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 14:21:15
 * @Description  :
 */
import { baseSize, designWidth } from '@/utils/config'
import { useLoadingBar } from 'naive-ui'

export default defineStore('common', () => {
  // 全局加载状态
  const loading = ref(false)
  const loadingCount = ref(0)
  watch(loadingCount, (val) => {
    loading.value = val > 0
  })
  watch(loading, (val) => {
    const loadingBar = useLoadingBar()
    if (val) {
      loadingBar.start()
    } else {
      loadingBar.finish()
    }
  })
  const screenWidth = ref(0)
  if (import.meta.env.SSR === false) {
    screenWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
    })
    // 根据屏幕宽度设置根字体大小
    function setRootFontSize(): void {
      // 计算比例
      const scale = screenWidth.value / designWidth
      // 设置根字体大小
      document.documentElement.style.fontSize = `${baseSize * scale}px`
    }
    watch(screenWidth, setRootFontSize, {
      immediate: true,
    })
  }

  return {
    loading,
    loadingCount,
    screenWidth,
  }
})
