/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-16 16:57:34
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-06-11 09:56:36
 * @Description  :
 */
export default import.meta.glob(
  ['./**/*.png', './**/*.jpg', './**/*.gif', './**/*.svg', '!./index/**/*.*', '!./public/**/*.*'],
  {
    import: 'default',
  },
) as Record<string, () => Promise<string>>
