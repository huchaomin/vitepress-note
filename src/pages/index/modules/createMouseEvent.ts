/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 09:43:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 17:17:27
 * @Description  :
 */
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import gsap from 'gsap'

export default (_this: CanvasRenderType, { provinceNameLabelArr }: {}) => {
  let objectsHover: THREE.Group[] = []
  let isClicked = false

  function moveProvinceNameLabel(adcode: number, type: 'down' | 'up') {
    provinceNameLabelArr.forEach((label) => {
      if (label.userData.adcode === adcode) {
        gsap.to(label.position, {
          duration: 0.3,
          z:
            type === 'up'
              ? label.userData.position[2] + _this.depth / 2 + 0.3
              : label.userData.position[2],
        })
      }
    })
  }

  function reset(group: THREE.Group) {
    gsap.to(group.scale, {
      duration: 0.3,
      onComplete: () => {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
            o.material[0].emissive.setHex(group.userData.materialEmissiveHex as number)
            o.material[0].emissiveIntensity = 1
            o.renderOrder = 9
          }
        })
      },
      z: 1,
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'down')
  }
  function move(group: THREE.Group) {
    console.log(group)
    gsap.to(group.scale, {
      duration: 0.3,
      z: 1.5,
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'up')
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
        o.material[0].emissive.setHex(0x0b112d)
        o.material[0].emissiveIntensity = 1.5 // 放射光强度
        o.renderOrder = 21
      }
    })
  }

  // 循环添加事件
  _this.eventElement.forEach((m) => {
    _this.interactionManager.add(m)
    // https://github.com/markuslerner/THREE.Interactive bindEventsOnBodyElement: true
    const mesh = m as unknown as HTMLBodyElement
    mesh.addEventListener('mousedown', () => {
      if (isClicked) {
        return
      }
      isClicked = true
    })
    mesh.addEventListener('mouseup', () => {
      isClicked = false
    })
    mesh.addEventListener('mouseover', (e) => {
      const event = e as unknown as THREE.Event<
        'mouseover',
        {
          parent: THREE.Group
        } & THREE.Mesh
      >
      if (!objectsHover.includes(event.target.parent as THREE.Group)) {
        objectsHover.push(event.target.parent)
      }
      _this.canvas.style.cursor = 'pointer'
      move(event.target.parent)
    })
    mesh.addEventListener('mouseout', (e) => {
      const event = e as unknown as THREE.Event<
        'mouseover',
        {
          parent: THREE.Group
        } & THREE.Mesh
      >
      objectsHover = objectsHover.filter(
        (n) => n.userData.name !== event.target.parent.userData.name,
      )
      reset(event.target.parent)
      _this.canvas.style.cursor = 'default'
    })
  })
}
