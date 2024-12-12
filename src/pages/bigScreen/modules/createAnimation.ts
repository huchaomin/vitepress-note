/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 16:23:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 18:22:06
 * @Description  :
 */
import gsap from 'gsap'
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import createGridRipple from './createGridRipple'
import type { labelInstance } from '@/components/three/utils/Label3d'
import { cameraPositionReadyKey, cameraPositionStartKey } from '@/pages/bigScreen/utils/others'

const cameraPositionReadyBus = useEventBus(cameraPositionReadyKey)
const cameraPositionStartBus = useEventBus(cameraPositionStartKey)

export default (
  _this: CanvasRenderType,
  {
    halo,
    mapGroup,
    mapSideMaterial,
    provinceCenterCircleArr,
    provinceLineMaterial,
    provinceNameLabelArr,
    rotateBorder1,
    rotateBorder2,
  }: {
    halo: THREE.Mesh
    mapGroup: THREE.Group
    mapSideMaterial: THREE.MeshStandardMaterial
    provinceCenterCircleArr: THREE.Group[]
    provinceLineMaterial: THREE.LineBasicMaterial
    provinceNameLabelArr: labelInstance[]
    rotateBorder1: THREE.Mesh
    rotateBorder2: THREE.Mesh
  },
) => {
  const tl = gsap.timeline()
  tl.addLabel('mapEnter', 4.5)
  const cameraPositionDuration = 6
  // 相机动画，相机动画结束前其他动画最好提前完成
  tl.add(
    gsap.to(_this.camera.instance.position, {
      duration: cameraPositionDuration,
      ease: 'power1.in',
      onComplete: () => {
        _this.camera.controls.saveState()
        cameraPositionReadyBus.emit()
      },
      onStart: () => {
        cameraPositionStartBus.emit()
      },
      z: 200,
    }),
  )
  // 光晕旋转动画
  tl.add(
    gsap.to(halo.rotation, {
      duration: cameraPositionDuration,
      z: -2 * Math.PI,
    }),
    '<',
  )
  // 光晕旋透明度
  tl.add(
    gsap.to(halo.material, {
      duration: cameraPositionDuration,
      opacity: 0,
    }),
    '<',
  )
  tl.add(
    gsap.to(rotateBorder1.scale, {
      delay: 0.3,
      duration: 1,
      ease: 'circ.out',
      x: 1,
      y: 1,
      z: 1,
    }),
    'mapEnter',
  )
  tl.add(
    gsap.to(rotateBorder2.scale, {
      delay: 0.5,
      duration: 1,
      ease: 'circ.out',
      x: 0.85,
      y: 0.85,
      z: 1,
    }),
    'mapEnter',
  )

  mapGroup.children.forEach((tempGroup) => {
    tempGroup.children.forEach((childGroup) => {
      if (childGroup.userData.type === 'shape') {
        childGroup.children.forEach((mesh) => {
          tl.add(
            // top material
            gsap.to(((mesh as THREE.Mesh).material as THREE.MeshStandardMaterial[])[0], {
              duration: 1,
              ease: 'circ.out',
              opacity: 1,
            }),
            'mapEnter',
          )
        })
      }
    })
  })
  tl.add(
    gsap.to(mapSideMaterial, {
      duration: 1,
      ease: 'circ.out',
      onComplete: () => {
        createGridRipple(_this)
      },
      opacity: 1,
    }),
    'mapEnter',
  )
  tl.add(
    gsap.to(provinceLineMaterial, {
      delay: 0.3,
      duration: 0.5,
      opacity: 1,
    }),
    'mapEnter',
  )

  provinceNameLabelArr.forEach((item, index) => {
    tl.add(
      gsap.to(item.element, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        opacity: 1,
      }),
      'mapEnter',
    )
  })
  provinceCenterCircleArr.forEach((item, index) => {
    tl.add(
      gsap.to(item.children[0].scale, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        x: 1.3,
        y: 1.3,
      }),
      'mapEnter',
    )
    tl.add(
      gsap.to(item.children[1].scale, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        x: 1.3,
        y: 1.3,
      }),
      'mapEnter',
    )
  })
}
