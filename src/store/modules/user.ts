/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-08 10:35:34
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-30 18:17:24
 * @Description  :
 */
import { login as loginMethod } from '@/api/root'
import Login from '@/pages/bigScreen/component/Login.vue'

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
    function clearSession() {
      token.value = ''
      void showLoginModal()
    }

    function showLoginModal(): Promise<void> {
      const loginInstance = ref<InstanceType<typeof Login> | null>(null)
      return new Promise((resolve) => {
        $modal({
          closable: false,
          content: () => h(Login, { ref: loginInstance }),
          negativeText: undefined,
          onPositiveClick: async () => {
            await loginInstance.value!.handleSubmit()
            $notify('登录成功')
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
