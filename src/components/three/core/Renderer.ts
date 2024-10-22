/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:17:33
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 10:21:17
 * @Description  :
 */
import { WebGLRenderer } from 'three'

export default class Renderer {
  instance: InstanceType<typeof WebGLRenderer>
  constructor({ camera, canvas, composer, postprocessing, scene, sizes }) {
    this.canvas = canvas
    this.sizes = sizes
    this.scene = scene
    this.camera = camera
    this.postprocessing = postprocessing
    this.composer = composer
    this.setInstance()
  }

  destroy() {
    this.instance.dispose()
    this.instance.forceContextLoss()
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this.canvas,
    })

    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    if (this.postprocessing && this.composer) {
      this.composer.render()
    } else {
      this.instance.render(this.scene, this.camera.instance)
    }
  }
}
