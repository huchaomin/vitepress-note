/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 09:43:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 10:58:48
 * @Description  :
 */
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import gsap from 'gsap'

export default (
  _this: CanvasRenderType,
  {
    provinceBadgeLabelArr,
    provinceCenterCircleArr,
    provinceNameLabelArr,
  }: {
    provinceBadgeLabelArr: THREE.Group[]
    provinceCenterCircleArr: THREE.Group[]
    provinceNameLabelArr: THREE.Group[]
  },
) => {
  // let isClicked = false
  function moveGroupZPosition(group: THREE.Group, type: 'down' | 'up') {
    gsap.to(group.position, {
      duration: 0.3,
      z:
        type === 'up'
          ? (group.userData.position as [number, number, number])[2] + _this.depth / 2 + 0.3
          : (group.userData.position as [number, number, number])[2],
    })
  }

  function moveProvinceNameLabel(adcode: number, type: 'down' | 'up') {
    provinceNameLabelArr.forEach((group) => {
      if (group.userData.adcode === adcode) {
        moveGroupZPosition(group, type)
      }
    })
  }

  function moveProvinceCenterCircle(adcode: number, type: 'down' | 'up') {
    provinceCenterCircleArr.forEach((group) => {
      if (group.userData.adcode === adcode) {
        moveGroupZPosition(group, type)
      }
    })
  }

  function moveProvinceBadgeLabel(adcode: number, type: 'down' | 'up') {
    provinceBadgeLabelArr.forEach((group) => {
      if (group.userData.adcode === adcode) {
        moveGroupZPosition(group, type)
      }
    })
  }

  function down(group: THREE.Group) {
    gsap.to(group.scale, {
      duration: 0.3,
      // onComplete: () => {},
      z: 1,
    })
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
        o.material[0].emissive.setHex(group.userData.materialEmissiveHex as number)
        o.material[0].emissiveIntensity = 1
        o.renderOrder = 9
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'down')
    moveProvinceCenterCircle(group.userData.adcode as number, 'down')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'down')
  }
  function up(group: THREE.Group) {
    gsap.to(group.scale, {
      duration: 0.3,
      z: 1.5,
    })
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
        o.material[0].emissive.setHex(0x0b112d)
        o.material[0].emissiveIntensity = 2 // 放射光强度
        o.renderOrder = 21
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'up')
    moveProvinceCenterCircle(group.userData.adcode as number, 'up')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'up')
  }

  // 循环添加事件
  _this.eventElement.forEach((m) => {
    _this.interactionManager.add(m)
    // https://github.com/markuslerner/THREE.Interactive bindEventsOnBodyElement: true
    const mesh = m as unknown as HTMLBodyElement
    // mesh.addEventListener('mousedown', () => {
    //   if (isClicked) {
    //     return
    //   }
    //   isClicked = true
    // })
    // mesh.addEventListener('mouseup', () => {
    //   isClicked = false
    // })
    mesh.addEventListener('mouseover', (e) => {
      const event = e as unknown as THREE.Event<
        'mouseover',
        {
          parent: THREE.Group
        } & THREE.Mesh
      >
      _this.canvas.style.cursor = 'pointer'
      up(event.target.parent)
    })
    mesh.addEventListener('mouseout', (e) => {
      const event = e as unknown as THREE.Event<
        'mouseover',
        {
          parent: THREE.Group
        } & THREE.Mesh
      >
      _this.canvas.style.cursor = 'default'
      down(event.target.parent)
    })
  })
}
