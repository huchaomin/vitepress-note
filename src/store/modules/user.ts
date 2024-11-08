/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 10:35:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-08 11:45:56
 * @Description  :
 */
export default defineStore(
  'user',
  () => {
    const token = ref('')
    function clearSession() {
      token.value = ''
    }
    return {
      clearSession,
      token,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
