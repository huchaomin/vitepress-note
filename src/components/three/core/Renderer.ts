/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:17:33
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-23 22:52:00
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
