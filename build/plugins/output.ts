/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-12-18 17:52:07
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-18 17:57:42
 * @Description  :
 */

export function assetFileNames(...arg): string {
  console.log(arg)

  return 'assets/[name]-[hash][extname]'
}
