/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:23:02
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 11:11:17
 * @Description  :
 */
import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  height: number
  pixelRatio: number
  width: number
  constructor({ canvas }) {
    super()
    this.canvas = canvas
    this.pixelRatio = 0
    this.init()
    window.addEventListener('resize', () => {
      this.init()
      this.emit('resize')
    })
  }

  destroy() {
    this.off('resize')
  }

  init() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = this.pixelRatio || Math.min(window.devicePixelRatio, 2)
  }
}
