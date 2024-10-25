/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:17:33
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 11:05:49
 * @Description  :
 */
import { WebGLRenderer } from 'three'
import type { ThreeCore } from './index'

export default class Renderer {
  readonly instance: InstanceType<typeof WebGLRenderer>
  constructor({ camera, canvas, scene, sizes, time }: ThreeCore) {
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    })

    sizes.on('resize', () => {
      this.instance.setSize(sizes.width, sizes.height)
      this.instance.setPixelRatio(sizes.pixelRatio)
    })

    time.on('tick', () => {
      this.instance.render(scene, camera.instance)
    })
  }

  destroy() {
    this.instance.dispose()
    this.instance.forceContextLoss()
  }
}
