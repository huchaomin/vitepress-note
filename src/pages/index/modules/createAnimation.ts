/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 16:23:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 18:42:38
 * @Description  :
 */
import gsap from 'gsap'
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import createGridRipple from './createGridRipple'
import type { labelInstance } from '@/components/three/utils/Label3d'

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
  tl.addLabel('halo', 5)
  tl.addLabel('focusMap', 3.5)
  tl.addLabel('focusMapOpacity', 4.0)
  tl.addLabel('province', 5.0)

  // 相机动画
  tl.add(
    gsap.to(_this.camera.instance.position, {
      delay: 2,
      duration: 2.5,
      ease: 'circ.out',
      onComplete: () => {
        _this.camera.controls.saveState()
      },
      x: 3.134497983573052,
      y: 126.8312346165316,
      z: 78.77649752477839,
    }),
  )

  // 光圈旋转动画
  tl.add(
    gsap.to(halo.rotation, {
      duration: 5,
      z: -2 * Math.PI,
    }),
    'halo',
  )
  tl.add(
    gsap.to(halo.material, {
      duration: 5,
      opacity: 0,
    }),
    'halo',
  )
  tl.add(
    gsap.to(mapGroup.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
    }),
    'focusMap',
  )
  tl.add(
    gsap.to(mapGroup.scale, {
      duration: 1,
      ease: 'circ.out',
      x: 1,
      y: 1,
      z: 1,
    }),
    'focusMap',
  )

  mapGroup.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      tl.add(
        gsap.to(((obj as THREE.Mesh).material as THREE.MeshStandardMaterial[])[0], {
          duration: 1,
          ease: 'circ.out',
          opacity: 1,
        }),
        'focusMapOpacity',
      )
      tl.add(
        gsap.to(obj.position, {
          duration: 1,
          ease: 'circ.out',
          x: 0,
          y: 0,
          z: 0,
        }),
        'focusMapOpacity',
      )
    }
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
    'focusMapOpacity',
  )
  tl.add(
    gsap.to(provinceLineMaterial, {
      delay: 0.3,
      duration: 0.5,
      opacity: 1,
    }),
    'focusMapOpacity',
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
    'focusMapOpacity',
  )
  tl.add(
    gsap.to(rotateBorder2.scale, {
      delay: 0.5,
      duration: 1,
      ease: 'circ.out',
      x: 1,
      y: 1,
      z: 1,
    }),
    'focusMapOpacity',
  )
  provinceNameLabelArr.forEach((item, index) => {
    tl.add(
      gsap.to(item.element, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'province',
    )
  })
  provinceCenterCircleArr.forEach((item, index) => {
    tl.add(
      gsap.to(item.children[0].scale, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        x: 1,
        y: 1,
        z: 1,
      }),
      'province',
    )
    tl.add(
      gsap.to(item.children[1].scale, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        x: 1,
        y: 1,
        z: 1,
      }),
      'province',
    )
  })
}
