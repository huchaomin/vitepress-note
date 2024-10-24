/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 15:04:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-24 23:38:28
 * @Description  :
 */
import {
  CSS3DObject,
  CSS3DSprite,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import type * as THREE from 'three'
import type { ThreeCore } from '@/components/three/core'

export type labelInstance = {
  hide: () => labelInstance
  init: (name: string, point: THREE.Vector3) => labelInstance
  show: () => labelInstance
} & (InstanceType<typeof CSS3DObject> | InstanceType<typeof CSS3DSprite>)

export default class Label3d {
  camera: ThreeCore['camera']
  css3dRender: CSS3DRenderer
  scene: ThreeCore['scene']
  sizes: ThreeCore['sizes']
  constructor({ camera, canvas, scene, sizes, time }: ThreeCore) {
    this.scene = scene
    this.camera = camera
    this.sizes = sizes
    this.css3dRender = new CSS3DRenderer() // 实例化css3d渲染器
    const { height, width } = this.sizes
    this.css3dRender.setSize(width, height) // 设置渲染器的尺寸
    this.css3dRender.domElement.style.position = 'absolute' // 设置定位位置
    this.css3dRender.domElement.style.left = '0px'
    this.css3dRender.domElement.style.top = '0px'
    this.css3dRender.domElement.style.pointerEvents = 'none' // 设置不能被选中
    this.css3dRender.domElement.className = `label3d-${useId()}`
    canvas.parentNode!.appendChild(this.css3dRender.domElement) // 插入到容器当中
    time.on('tick', () => {
      this.update()
    })
    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  create(className = '', isSprite = true) {
    const tag = document.createElement('div')
    tag.className = className
    tag.style.visibility = 'hidden'
    tag.style.position = 'absolute'
    let labelInit: InstanceType<typeof CSS3DObject> | InstanceType<typeof CSS3DSprite> | null = null
    if (!isSprite) {
      labelInit = new CSS3DObject(tag)
    } else {
      labelInit = new CSS3DSprite(tag)
    }
    const label = labelInit as labelInstance
    label.init = (innerHTML: string, position: THREE.Vector3) => {
      label.element.innerHTML = innerHTML
      label.element.style.visibility = 'visible'
      label.element.style.pointerEvents = 'none'
      label.position.copy(position)
      return label
    }
    label.hide = () => {
      label.element.style.visibility = 'hidden'
      return label
    }
    label.show = () => {
      label.element.style.visibility = 'visible'
      return label
    }
    return label
  }

  destroy() {
    this.css3dRender.domElement.remove()
  }

  resize() {
    const { height, width } = this.sizes
    this.css3dRender.setSize(width, height)
  }

  update() {
    this.css3dRender.render(this.scene, this.camera.instance)
  }
}
