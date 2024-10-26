/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-26 16:45:27
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
  }

  return {
    loading,
    loadingCount,
    loadingText,
    screenWidth,
  }
})
