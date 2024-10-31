/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-31 16:21:32
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-31 16:24:35
 * @Description  :
 */
let count = 0

function useUniqueId(str = 'id'): string {
  return `${str}${count++}`
}

export default useUniqueId
