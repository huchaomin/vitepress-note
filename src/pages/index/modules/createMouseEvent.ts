/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 09:43:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-04 09:42:12
 * @Description  :
 */
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import gsap from 'gsap'
import type { labelInstance } from '@/components/three/utils/Label3d'

export default (
  _this: CanvasRenderType,
  {
    provinceArrowLabelArr,
    provinceBadgeLabelArr,
    provinceCenterCircleArr,
    provinceNameLabelArr,
  }: {
    provinceArrowLabelArr: labelInstance[]
    provinceBadgeLabelArr: labelInstance[]
    provinceCenterCircleArr: THREE.Group[]
    provinceNameLabelArr: labelInstance[]
  },
) => {
  // let isClicked = false
  function moveGroupZPosition(group: labelInstance | THREE.Group, type: 'down' | 'up') {
    gsap.to(group.position, {
      duration: 0.3,
      z:
        type === 'up'
          ? (group.userData.position as [number, number, number])[2] + _this.depth
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
    ;[...provinceBadgeLabelArr, ...provinceArrowLabelArr].forEach((group) => {
      if (group.userData.adcode === adcode) {
        moveGroupZPosition(group, type)
      }
    })
  }

  function down(group: THREE.Group) {
    gsap.to(group.position, {
      duration: 0.3,
      // onComplete: () => {},
      z: 0,
    })
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
        o.material[0].emissive.setHex(group.userData.materialEmissiveHex as number)
        o.material[0].emissiveIntensity = 1
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'down')
    moveProvinceCenterCircle(group.userData.adcode as number, 'down')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'down')
  }
  function up(group: THREE.Group) {
    gsap.to(group.position, {
      duration: 0.3,
      z: _this.depth,
    })
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const o = obj as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
        o.material[0].emissive.setHex(0x0b112d)
        o.material[0].emissiveIntensity = 2 // 放射光强度
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'up')
    moveProvinceCenterCircle(group.userData.adcode as number, 'up')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'up')
  }

  // 循环添加事件
  _this.provinceMeshArr.forEach((m) => {
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
