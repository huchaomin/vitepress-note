/*
 * @Author       : huchaomin
 * @Date         : 2023-10-30 15:31:12
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-16 11:19:58
 * @Description  :
 */
import { inBrowser } from 'vitepress'

export default defineStore('common', () => {
  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const showLeftDrawer = ref(!(inBrowser && (isTablet.value || isMobile.value)))

  return {
    screenHeight,
    screenWidth,
    showLeftDrawer,
  }
})
