/*
 * @Author       : peter
 * @Date         : 2024-10-16 16:57:34
 * @LastEditors  : peter
 * @LastEditTime : 2024-10-16 17:34:51
 * @Description  :
 */
export default import.meta.glob('./**/*.vue', {
  import: 'default',
}) as Record<string, () => Promise<Component>>
