/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 09:43:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-20 13:50:08
 * @Description  :
 */
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import gsap from 'gsap'
import type { labelInstance } from '@/components/three/utils/Label3d'
import { repayItemChangeKey, type ItemType } from '@/pages/bigScreen/utils/others'

const duration = 1
export default (
  _this: CanvasRenderType,
  {
    mapGroup,
    provinceArrowLabelArr,
    provinceBadgeLabelArr,
    provinceCenterCircleArr,
    provinceNameLabelArr,
  }: {
    mapGroup: THREE.Group
    provinceArrowLabelArr: labelInstance[]
    provinceBadgeLabelArr: labelInstance[]
    provinceCenterCircleArr: THREE.Group[]
    provinceNameLabelArr: labelInstance[]
  },
) => {
  // let isClicked = false
  function moveGroupZPosition(group: labelInstance | THREE.Group, type: 'down' | 'up') {
    gsap.to(group.position, {
      duration,
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
        group.traverse((g) => {
          if (g.userData.type === 'inner') {
            if (type === 'up') {
              let callback = g.userData.callback as ((...args: any[]) => void) | undefined
              if (callback === undefined) {
                callback = (delta: number) => {
                  g.rotation.z += delta * 2
                }
                g.userData.callback = callback
              }
              _this.time.on('tick', callback)
            } else {
              _this.time.off('tick', g.userData.callback as (...args: any[]) => void)
            }
          }
        })
      }
    })
  }

  function moveProvinceBadgeLabel<T extends 'down' | 'up'>(
    adcode: number,
    type: T,
    data: T extends 'up' ? ItemType : undefined,
  ) {
    ;[...provinceBadgeLabelArr, ...provinceArrowLabelArr].forEach((group) => {
      if (group.userData.adcode === adcode) {
        moveGroupZPosition(group, type)
        if (group.update !== undefined && type === 'up') {
          group.update(data!.clientName, data!.repayAmt)
        }
        gsap.to(group.element, {
          duration,
          ease: 'circ.out',
          opacity: type === 'up' ? 1 : 0,
        })
      }
    })
  }

  function down(group: THREE.Group) {
    gsap.to(group.position, {
      duration,
      z: 0,
    })
    group.traverse((g) => {
      if (g.userData.type === 'shape') {
        // TODO 为什么这里不能用g.traverse
        g.children.forEach((m) => {
          const o = m as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
          o.material[0].emissive.setHex(o.userData.materialEmissiveHex as number)
        })
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'down')
    moveProvinceCenterCircle(group.userData.adcode as number, 'down')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'down', undefined)
  }
  function up(group: THREE.Group, data: ItemType) {
    gsap.to(group.position, {
      duration,
      z: _this.depth,
    })
    group.traverse((g) => {
      if (g.userData.type === 'shape') {
        g.children.forEach((m) => {
          const o = m as THREE.Mesh<any, THREE.MeshStandardMaterial[], any>
          o.material[0].emissive.setHex(0x528e58)
        })
      }
    })
    moveProvinceNameLabel(group.userData.adcode as number, 'up')
    moveProvinceCenterCircle(group.userData.adcode as number, 'up')
    moveProvinceBadgeLabel(group.userData.adcode as number, 'up', data)
  }

  const bus = useEventBus(repayItemChangeKey)
  let currentUpGroup: null | THREE.Group = null
  bus.on(({ arr, index }) => {
    const current = arr[index]
    const result = mapGroup.children.find(
      (tempGroup) => tempGroup.userData.name === current.registerProv,
    )
    if (result) {
      up(result as THREE.Group, current)
      if (currentUpGroup && currentUpGroup.userData.name !== current.registerProv) {
        down(currentUpGroup)
      }
      currentUpGroup = result as THREE.Group
    }
  })

  /*
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
          parent: {
            parent: THREE.Group
          }
        } & THREE.Mesh
      >
      // _this.canvas.style.cursor = 'pointer'
      up(event.target.parent.parent) // tempGroup
    })
    mesh.addEventListener('mouseout', (e) => {
      const event = e as unknown as THREE.Event<
        'mouseover',
        {
          parent: {
            parent: THREE.Group
          }
        } & THREE.Mesh
      >
      // _this.canvas.style.cursor = 'default'
      down(event.target.parent.parent) // tempGroup
    })
  })
  */
}
