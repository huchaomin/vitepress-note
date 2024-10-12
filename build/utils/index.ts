/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-10 18:37:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-12 16:57:44
 * @Description  :
 */

// [normalizePath](https://github.com/jiangjiu/blog-md/issues/47)
import path from 'node:path'
import process from 'node:process'
import { loadEnv, normalizePath } from 'vite'
import { parseLoadedEnv } from 'vite-plugin-env-parse'

function resolveCwd(p: string): string {
  return path.resolve(process.cwd(), p)
}

const envDir = resolveCwd('env')

function getEnv(mode: string): ImportMetaEnv {
  // loadEnv 设置第三个参数为空 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  return parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
}

function normalizeJoinPath(...paths: string[]): string {
  return normalizePath(path.join(...paths))
}

export { envDir, getEnv, normalizeJoinPath, resolveCwd }
