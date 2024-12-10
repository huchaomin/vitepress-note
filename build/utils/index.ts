/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-10 18:37:28
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-09 17:07:28
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

const envDir = resolveCwd('build/env')
const mdPageDir = 'src/pages'

function extractLang(info: string): string {
  return info
    .trim()
    .replace(/=\d*/, '')
    .replace(/:(?:no-)?line-numbers(?:[{ ]|$|=).*/, '')
    .replace(/(?:-vue|\{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
    .replace(/^ansi$/, '')
}

function extractTitle(info: string, html = false) {
  if (html) {
    return info.replace(/<!--[\s\S]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

function firstUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getEnv(mode: string): ImportMetaEnv {
  // loadEnv 设置第三个参数为空 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  return parseLoadedEnv(loadEnv(mode, envDir)) as ImportMetaEnv
}
function normalizeJoinPath(...paths: string[]): string {
  return normalizePath(path.join(...paths))
}

export { envDir, extractTitle, firstUpperCase, getEnv, mdPageDir, normalizeJoinPath, resolveCwd }
