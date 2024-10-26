/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-20 11:53:49
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-30 15:32:28
 * @Description  :
 */
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())
export default pinia
