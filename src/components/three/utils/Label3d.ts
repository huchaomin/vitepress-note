/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 15:04:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 15:26:32
 * @Description  :
 */
import {
  CSS3DObject,
  CSS3DSprite,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export default class Label3d {
  constructor({ camera, canvas, scene, sizes, time }) {
    this.scene = scene
    this.camera = camera
    this.time = time
    this.sizes = sizes
    this.canvas = canvas
    this.parent = null
    const { height, width } = this.sizes
    const css3dRender = new CSS3DRenderer() // 实例化css3d渲染器
    css3dRender.setSize(width, height) // 设置渲染器的尺寸
    css3dRender.domElement.style.position = 'absolute' // 设置定位位置
    css3dRender.domElement.style.left = '0px'
    css3dRender.domElement.style.top = '0px'
    css3dRender.domElement.style.pointerEvents = 'none' // 设置不能被选中
    css3dRender.domElement.className = `label3d-${useId()}`
    this.canvas.parentNode.appendChild(css3dRender.domElement) // 插入到容器当中
    this.css3dRender = css3dRender
    this.time.on('tick', () => {
      this.update()
    })
    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  /**
   * 创建3d标签，默认用CSS3DObject，
   * @param {*} name  标签内容
   * @param {*} className 标签class
   * @param {*} isSprite  是否是CSS3DSprite   fasle|true
   * @returns
   */
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
      tag.style.fontSize = '12px'
      tag.style.textAlign = 'center'
      tag.style.background = 'rgba(0,0,0,0.6)'
      tag.style.borderRadius = '4px'
    }
    let label = null
    if (!isSprite) {
      label = new CSS3DObject(tag)
    } else {
      label = new CSS3DSprite(tag)
    }

    /**
     * 标签初始化并显示，
     * @param {*} name 显示内容
     * @param {*} point 显示坐标
     */
    label.init = (name, point) => {
      label.element.innerHTML = name
      label.element.style.visibility = 'visible'
      label.position.copy(point)
    }
    /**
     * 隐藏
     */
    label.hide = () => {
      label.element.style.visibility = 'hidden'
    }
    /**
     * 隐藏
     */
    label.show = () => {
      label.element.style.visibility = 'visible'
    }
    label.setParent = (parent) => {
      this.parent = parent
      parent.add(label)
    }
    label.remove = () => {
      this.parent.remove(label)
      // console.log(this.css3dRender.domElement, label.element);
      // this.css3dRender.domElement.parentNode.remove(label.element);
    }
    return label
  }

  destroy() {
    if (this.css3dRender) {
      const domElement = this.css3dRender.domElement
      domElement.parentNode.removeChild(domElement)
    }
  }

  resize() {
    const { height, width } = this.sizes
    this.css3dRender.setSize(width, height)
  }

  /**
   * 设置label的样式，
   * @param {*} label 标签对象
   * @param {*} scale 缩放值
   * @param {*} axis 旋转轴
   * @param {*} pointerEvents 鼠标事件控制 none | auto
   */
  setLabelStyle(label, scale = 0.1, axis = 'x', pointerEvents = 'none') {
    label.element.style.pointerEvents = pointerEvents
    label.scale.set(scale, scale, scale) // 根据相机渲染范围控制HTML 3D标签尺寸
    label.rotation[axis] = Math.PI / 2 // 控制HTML标签CSS3对象角度,
  }

  update() {
    this.css3dRender.render(this.scene, this.camera.instance)
  }
}
