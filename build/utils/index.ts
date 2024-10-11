/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-10 18:37:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-11 09:15:27
 * @Description  :
 */
import path from 'node:path'
import process from 'node:process'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

export { resolveCwd }
