/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:52:52
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 11:11:26
 * @Description  : TODO 删除没用的一些属性
 */
import EventEmitter from './EventEmitter'
import * as THREE from 'three'

export default class Time extends EventEmitter {
  clock: THREE.Clock
  current: number
  delta: number
  elapsed: number
  start: number
  stop: boolean
  timer: number
  constructor() {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0 // 过去的时间
    this.delta = 16 // 三角函数的时间
    this.clock = new THREE.Clock()
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  destroy() {
    this.stop = true
    this.off('tick')
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    const delta = this.clock.getDelta()
    const elapsedTime = this.clock.getElapsedTime()
    this.emit('tick', delta, elapsedTime)
    if (this.stop) {
      window.cancelAnimationFrame(this.timer)
      return false
    }
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
