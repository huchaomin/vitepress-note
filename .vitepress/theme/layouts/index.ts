/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 16:57:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 17:34:51
 * @Description  :
 */
export default import.meta.glob('./**/*.vue', {
  import: 'default',
}) as Record<string, () => Promise<Component>>