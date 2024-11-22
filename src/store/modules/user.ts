/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 10:35:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-22 14:12:32
 * @Description  :
 */
import { login as loginMethod } from '@/api/root'
import Login from '@/pages/index/component/Login.vue'

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
    }
    function clearSession(showLogin = true) {
      token.value = ''
      if (showLogin) {
        void showLoginModal(true)
      }
    }

    function showLoginModal(refresh = false): Promise<void> {
      const loginInstance: Ref<InstanceType<typeof Login> | null> = ref(null)
      return new Promise((resolve) => {
        $modal({
          closable: false,
          content: () => h(Login, { ref: loginInstance }),
          negativeText: undefined,
          onPositiveClick: async () => {
            await loginInstance.value!.handleSubmit()
            $notify('登录成功')
            if (refresh) {
              location.reload()
            }
            resolve()
          },
          title: '请登录',
        })
      })
    }
    return {
      clearSession,
      login,
      showLoginModal,
      token,
    }
  },
  {
    persist: {
      pick: ['token'],
    },
  },
)
