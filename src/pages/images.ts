/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 16:57:34
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-05 10:13:35
 * @Description  :
 */
export default import.meta.glob(['./**/*.png', './**/*.gif', '!./index/**/*.*'], {
  import: 'default',
}) as Record<string, () => Promise<string>>
