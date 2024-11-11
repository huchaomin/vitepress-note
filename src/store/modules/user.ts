/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 10:35:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 17:30:42
 * @Description  :
 */
import { login as loginMethod } from '@/api/root'

export default defineStore(
  'user',
  () => {
    const token = ref('')
    async function login({ password, username }: { password: string; username: string }) {
      const res = await loginMethod({
        password,
        username,
      })
      token.value = res.token
      $notify('登录成功')
    }
    function clearSession() {
      token.value = ''
    }
    return {
      clearSession,
      login,
      token,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
