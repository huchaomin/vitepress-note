/*
 * @Author       : huchaomin
 * @Date         : 2023-10-23 13:57:27
 * @LastEditors  : huchaomin
 * @LastEditTime : 2025-07-22 16:10:44
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
