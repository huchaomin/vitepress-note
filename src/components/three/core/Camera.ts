/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 09:18:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 11:11:04
 * @Description  :
 */
import type * as THREE from 'three'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { ThreeCore } from './index'

export default class Camera {
  readonly controls: InstanceType<typeof OrbitControls>
  readonly instance: THREE.PerspectiveCamera

  constructor({ canvas, scene, sizes, time }: ThreeCore) {
    this.instance = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 2000)
    this.instance.position.set(10, 10, 10)
    scene.add(this.instance)

    this.controls = new OrbitControls(this.instance, canvas)
    this.controls.enableDamping = true

    sizes.on('resize', () => {
      this.instance.aspect = sizes.width / sizes.height
      this.instance.updateProjectionMatrix()
    })

    time.on('tick', () => {
      this.controls.update()
    })
  }

  destroy() {
    this.controls.dispose()
  }
}
