/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 15:28:08
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 15:34:16
 * @Description  :
 */
export default class AnyHistory {
  future: any[]
  past: any[]
  present: any
  constructor() {
    this.past = [] // 过去的
    this.future = [] // 未来的
    this.present = undefined // 当前的
  }

  // 获取当前状态index
  getIndex() {
    return this.past.length
  }

  gotoState(index: number) {
    // eslint-disable-next-line ts/no-unsafe-assignment
    const allState: any[] = [...this.past, this.present, ...this.future]
    // eslint-disable-next-line ts/no-unsafe-assignment
    this.present = allState[index]
    this.past = allState.slice(0, index)
    this.future = allState.slice(index + 1, allState.length)
  }

  // 保存当前状态
  push(currentState: any) {
    // 将状态都保存，并更新当前状态
    if (this.present !== undefined) {
      this.past.push(this.present)
    }
    // eslint-disable-next-line ts/no-unsafe-assignment
    this.present = currentState
  }

  // 前进
  redo() {
    if (this.future.length !== 0) {
      this.gotoState(this.getIndex() + 1)
    }
  }

  // 后退
  undo() {
    if (this.past.length !== 0) {
      this.gotoState(this.getIndex() - 1)
    }
  }
}
