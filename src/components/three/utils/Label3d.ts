/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 15:04:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 18:36:39
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
  hide: () => void
  init: (name: string, point: THREE.Vector3) => void
  removeSelf: () => void // 不能叫remove，因为有remove方法
  setParent: (parent: THREE.Group) => void
  show: () => void
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
    const { height, width } = this.sizes
    const css3dRender = new CSS3DRenderer() // 实例化css3d渲染器
    css3dRender.setSize(width, height) // 设置渲染器的尺寸
    css3dRender.domElement.style.position = 'absolute' // 设置定位位置
    css3dRender.domElement.style.left = '0px'
    css3dRender.domElement.style.top = '0px'
    css3dRender.domElement.style.pointerEvents = 'none' // 设置不能被选中
    css3dRender.domElement.className = `label3d-${useId()}`
    canvas.parentNode!.appendChild(css3dRender.domElement) // 插入到容器当中
    this.css3dRender = css3dRender
    time.on('tick', () => {
      this.update()
    })
    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  create(name = '', className = '', isSprite = false) {
    const tag = document.createElement('div')
    tag.innerHTML = name
    tag.className = className
    tag.style.visibility = 'hidden'
    tag.style.position = 'absolute'
    // 如果className不存在，用以下样式
    if (!className) {
      tag.style.padding = '10px'
      tag.style.color = '#fff'
      tag.style.fontSize = '14px'
      tag.style.textAlign = 'center'
      tag.style.background = 'rgba(0,0,0,0.6)'
      tag.style.borderRadius = '4px'
    }
    let labelInit: InstanceType<typeof CSS3DObject> | InstanceType<typeof CSS3DSprite> | null = null
    if (!isSprite) {
      labelInit = new CSS3DObject(tag)
    } else {
      labelInit = new CSS3DSprite(tag)
    }
    const label = labelInit as labelInstance
    label.init = (name: string, point: THREE.Vector3) => {
      label.element.innerHTML = name
      label.element.style.visibility = 'visible'
      label.position.copy(point)
    }
    label.hide = () => {
      label.element.style.visibility = 'hidden'
    }
    label.show = () => {
      label.element.style.visibility = 'visible'
    }
    label.setParent = (parent) => {
      parent.add(label)
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

  setLabelStyle(
    label: labelInstance,
    scale = 0.1,
    axis: 'x' | 'y' | 'z' = 'x',
    pointerEvents = 'none',
  ) {
    label.element.style.pointerEvents = pointerEvents
    label.scale.set(scale, scale, scale) // 根据相机渲染范围控制HTML 3D标签尺寸
    label.rotation[axis] = Math.PI / 2 // 控制HTML标签CSS3对象角度,
  }

  update() {
    this.css3dRender.render(this.scene, this.camera.instance)
  }
}
