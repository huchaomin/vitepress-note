/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 15:04:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 18:16:37
 * @Description  :
 */
import {
  CSS3DObject,
  CSS3DSprite,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import type * as THREE from 'three'
import type { ThreeCore } from '../core'

export type labelInstance = {
  hide: () => labelInstance
  init: (name: string, point: THREE.Vector3, update?: labelInstance['update']) => labelInstance
  show: () => labelInstance
  update?: (...arg: any) => void
} & (InstanceType<typeof CSS3DObject> | InstanceType<typeof CSS3DSprite>)

export default class Label3d {
  private css3dRender: CSS3DRenderer
  private labelScale: number
  constructor({ camera, canvas, scene, sizes, time }: ThreeCore, config?: { labelScale?: number }) {
    this.labelScale = config?.labelScale ?? 0.125
    const css3dRender = new CSS3DRenderer() // 实例化css3d渲染器
    css3dRender.domElement.style.position = 'absolute' // 设置定位位置
    css3dRender.domElement.style.left = '0px'
    css3dRender.domElement.style.top = '0px'
    css3dRender.domElement.style.zIndex = '1'
    css3dRender.domElement.style.pointerEvents = 'none' // 设置不能被选中
    css3dRender.domElement.className = `label3d-${useId()}`
    canvas.parentNode!.appendChild(css3dRender.domElement) // 插入到容器当中
    time.on('tick', () => {
      css3dRender.render(scene, camera.instance)
    })
    sizes.on('resize', () => {
      css3dRender.setSize(sizes.width, sizes.height)
    })
    this.css3dRender = css3dRender
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
    label.init = (innerHTML: string, position: THREE.Vector3, update) => {
      label.element.innerHTML = innerHTML
      label.element.style.visibility = 'visible'
      label.position.copy(position)
      label.scale.set(this.labelScale, this.labelScale, this.labelScale) // 根据相机渲染范围控制HTML 3D标签尺寸
      label.update = update
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
}
