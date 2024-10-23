/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:23:02
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 17:44:04
 * @Description  :
 */
import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  canvas: HTMLCanvasElement
  height: number
  pixelRatio: number
  width: number
  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super()
    this.canvas = canvas
    this.pixelRatio = 1
    const { height, width } = useElementSize(this.canvas)
    watch(
      [width, height],
      () => {
        this.width = width.value
        this.height = height.value
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
