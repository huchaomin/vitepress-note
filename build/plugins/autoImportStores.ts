/*
 * @Author       : peter
 * @Date         : 2024-10-26 16:32:27
 * @LastEditors  : peter
 * @LastEditTime : 2024-12-10 11:01:46
 * @Description  :
 */
import fg from 'fast-glob'
import path from 'node:path'

import { firstUpperCase } from '../utils/index.ts'

const piniaStoreKeys: string[] = []
const files = fg.globSync('src/store/modules/*.ts')

files.forEach((p) => {
  piniaStoreKeys.push(path.basename(p, '.ts'))
})

const customerImport: Record<string, [string, string][]> = {}

// 自动引入pinia的store
piniaStoreKeys.forEach((key) => {
  customerImport[`@/store/modules/${key}`] = [['default', `use${firstUpperCase(key)}Store`]]
})
export default customerImport
