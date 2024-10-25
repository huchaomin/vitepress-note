/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 10:21:36
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 16:57:40
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

interface geoProjectionConfig {
  geoProjectionCenter: [number, number]
  geoProjectionScale: number
  geoProjectionTranslate: [number, number]
}
export class ThreeCore extends EventEmitter {
  private config: geoProjectionConfig

  readonly camera: Camera
  readonly canvas: HTMLCanvasElement
  readonly renderer: Renderer
  readonly scene: THREE.Scene
  readonly sizes: Sizes
  readonly time: Time

  constructor(canvas: HTMLCanvasElement, config: Partial<geoProjectionConfig>) {
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
    this.time.on('tick', () => {
      // 此时如果 子类实例定义了 update 方法，会执行子类的 update 方法
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
      // child: Scene、 PerspectiveCamera、 Mesh、 Group、LineLoop、 CSS3DSprite、 Light...
      if (child instanceof Mesh) {
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

  geoProjection(point: [number, number], geoProjectionConfig?: Partial<geoProjectionConfig>) {
    const { geoProjectionCenter, geoProjectionScale, geoProjectionTranslate } = {
      ...this.config,
      ...(geoProjectionConfig ?? {}),
    }
    return geoMercator()
      .center(geoProjectionCenter)
      .scale(geoProjectionScale)
      .translate(geoProjectionTranslate)(point)
  }

  setAxesHelper(size = 100) {
    const axes = new AxesHelper(size)
    axes.setColors('red', 'yellow', 'blue')
    this.scene.add(axes)
  }

  update() {}
}
