/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:52:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 11:33:53
 * @Description  : TODO 删除没用的一些属性
 */
import EventEmitter from './EventEmitter'
import * as THREE from 'three'

export default class Time extends EventEmitter {
  private clock: THREE.Clock
  private timer: number
  stop: boolean
  constructor() {
    super()
    this.stop = false
    this.clock = new THREE.Clock()
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  protected tick() {
    if (this.stop) {
      window.cancelAnimationFrame(this.timer)
      return false
    }
    this.emit('tick', this.clock.getDelta(), this.clock.getElapsedTime())
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  destroy() {
    this.stop = true
    this.off('tick')
  }
}
