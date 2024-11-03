/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-03 17:01:05
 * @Description  :
 */
import { baseSize, designWidth } from '@/utils/config'

export default defineStore('common', () => {
  // 全局加载状态
  const loading = ref(false)
  const loadingCount = ref(0)
  const loadingText = ref('')
  watch(loadingCount, (val) => {
    loading.value = val > 0
    if (val === 0) {
      loadingText.value = ''
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
    loadingText,
    screenWidth,
  }
})
