/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-23 13:57:27
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 17:07:41
 * @Description  :
 */

function getFilenameFromUrl(url: string, withExt: boolean = false): string {
  const name = (url.split('/').pop() ?? '').split('?')[0]
  if (withExt) {
    return name
  } else {
    const arr = name.split('.')
    arr.pop()
    return arr.join('.')
  }
}

export { getFilenameFromUrl }
