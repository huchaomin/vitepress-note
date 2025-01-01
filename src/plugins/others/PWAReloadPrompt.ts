/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2025-01-01 21:06:31
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-01 21:35:36
 * @Description  :
 */
import { registerSW } from 'virtual:pwa-register'

const offlineReady = ref(false)
const needRefresh = ref(false)

async function close() {
  offlineReady.value = false
  needRefresh.value = false
}
function onNeedRefresh() {
  needRefresh.value = true
}
function onOfflineReady() {
  offlineReady.value = true
}

const updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh,
  onOfflineReady,
  onRegistered() {
    console.info('Service Worker registered')
  },
  onRegisterError(e) {
    console.error('Service Worker registration error!', e)
  },
})

watchEffect(() => {
  if (offlineReady.value || needRefresh.value) {
  }
})
