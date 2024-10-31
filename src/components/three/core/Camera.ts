/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 09:18:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-31 16:53:13
 * @Description  :
 */
import type * as THREE from 'three'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { ThreeCore } from './index'

export default class Camera {
  private isClicked: boolean
  readonly controls: InstanceType<typeof OrbitControls>
  readonly instance: THREE.PerspectiveCamera

  constructor({ canvas, scene, sizes, time }: ThreeCore) {
    this.instance = new PerspectiveCamera(45, sizes.width / sizes.height, 1)
    scene.add(this.instance)

    this.controls = new OrbitControls(this.instance, canvas)
    // this.controls.enableDamping = true // 阻尼效果
    this.isClicked = false
    canvas.addEventListener('mousedown', () => {
      if (this.isClicked) {
        return
      }
      this.isClicked = true
    })
    canvas.addEventListener('mouseup', () => {
      this.isClicked = false
    })

    sizes.on('resize', () => {
      this.instance.aspect = sizes.width / sizes.height
      this.instance.updateProjectionMatrix()
    })

    time.on('tick', () => {
      if (this.isClicked) {
        this.controls.update()
      }
    })
  }

  destroy() {
    this.controls.dispose()
  }
}
