/*
 * @Author       : huchaomin
 * @Date         : 2023-10-20 11:53:49
 * @LastEditors  : peter
 * @LastEditTime : 2024-11-13 17:36:21
 * @Description  :
 */
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: {
      getItem: (key) => {
        const cookies = useCookies([key])
        return cookies.get(key)
      },
      setItem: (key, value) => {
        const cookies = useCookies([key])
        // https://www.npmjs.com/package/universal-cookie#api---cookies-class
        cookies.set(key, value, {
          /*
            设置cookie 时省略domain参数，那么domain默认为当前域名
            domain 参数可以设置赋予名以及自身，设置其他的域名则不生效
            cookie的作用域是： domain本身以及domain下的所有子域名
          */
          maxAge: 60 * 60 * 24 * 365, // 365 如果不设置的话，cookie 会在浏览器关闭后自动删除
          path: '/', // 默认为请求 uri 的路径
          // secure: false, // 默认为false，如果为true，则只有https请求才会发送cookie
          // httpOnly: false, // 默认为false，如果为true，则只有服务器可以访问cookie
        })
      },
    },
  }),
)
export default pinia
