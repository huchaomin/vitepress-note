/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-26 17:34:52
 * @Description  :
 */
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
      const baseSize = 16 // 基础字体大小
      const designWidth = 1920 // 设计稿宽度
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
