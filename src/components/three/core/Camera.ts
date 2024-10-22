/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 09:18:38
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 10:59:35
 * @Description  :
 */
import type * as THREE from 'three'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  controls: InstanceType<typeof OrbitControls>
  instance: THREE.PerspectiveCamera

  constructor({ canvas, scene, sizes }) {
    this.sizes = sizes
    this.scene = scene
    this.canvas = canvas
    this.setInstance()
    this.setControls()
  }

  destroy() {
    this.controls.dispose()
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.update()
  }

  setInstance() {
    const aspect = this.sizes.width / this.sizes.height
    this.instance = new PerspectiveCamera(45, aspect, 0.1, 2000)
    this.instance.position.set(10, 10, 10)

    this.scene.add(this.instance)
  }

  update() {
    this.controls.update()
  }
}
