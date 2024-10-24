/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:21:36
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-24 23:49:48
 * @Description  :
 */
import { AxesHelper, Scene, Mesh } from 'three'
import EventEmitter from '../utils/EventEmitter'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Renderer from './Renderer'
import Camera from './Camera'
import { geoMercator } from 'd3-geo'
import type * as THREE from 'three'

export class ThreeCore extends EventEmitter {
  camera: Camera
  canvas: HTMLCanvasElement
  renderer: Renderer
  scene: THREE.Scene
  sizes: Sizes
  time: Time

  constructor(
    canvas: HTMLCanvasElement,
    config: {
      geoProjectionCenter: ConstructorParameters<typeof THREE.Vector2>
    },
  ) {
    super()
    this.canvas = canvas
    this.scene = new Scene()
    this.sizes = new Sizes(this)
    this.time = new Time()
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    const defaultConfig = {
      geoProjectionCenter: [0, 0],
      geoProjectionScale: 120,
      geoProjectionTranslate: [0, 0],
    }
    this.config = Object.assign({}, defaultConfig, config)
    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  destroy() {
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    // https://threejs.org/docs/index.html#manual/zh/introduction/How-to-dispose-of-objects
    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        debugger
        if (child.geometry !== undefined) {
          ;(child.geometry as THREE.BufferGeometry).dispose()
        }
        // TODO Dispose material 这个方法是不是正确的
        if (child.material !== undefined) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              ;(material as THREE.Material).dispose()
            })
          } else {
            ;(child.material as THREE.Material).dispose()
          }
        }
      }
    })
    // TODO 是否有必要 Optionally, you can also remove all objects from the scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0])
    }
    this.canvas.parentNode!.removeChild(this.canvas)
  }

  geoProjection(args) {
    const { geoProjectionCenter, geoProjectionScale, geoProjectionTranslate } = this.config
    return geoMercator()
      .center(geoProjectionCenter)
      .scale(geoProjectionScale)
      .translate(geoProjectionTranslate)(args)
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  /**
   * 设置AxesHelper
   */
  setAxesHelper(size = 250) {
    const axes = new AxesHelper(size)
    this.scene.add(axes)
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }
}
