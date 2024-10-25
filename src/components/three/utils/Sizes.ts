/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:23:02
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 11:19:54
 * @Description  :
 */
import EventEmitter from './EventEmitter'
import type { ThreeCore } from '../core'

export default class Sizes extends EventEmitter {
  readonly height!: number
  readonly pixelRatio!: number
  readonly width!: number
  constructor({ canvas }: ThreeCore) {
    super()
    const { height, width } = useElementSize(canvas)
    watch(
      [width, height],
      () => {
        // @ts-expect-error 外部实例不能修改 readonly 属性， 这里可以
        this.width = width.value
        // @ts-expect-error 外部实例不能修改 readonly 属性， 这里可以
        this.height = height.value
        // @ts-expect-error 外部实例不能修改 readonly 属性， 这里可以
        this.pixelRatio = this.pixelRatio || Math.min(window.devicePixelRatio, 2)
        this.emit('resize')
      },
      { immediate: true },
    )
  }

  destroy() {
    this.off('resize')
  }
}
