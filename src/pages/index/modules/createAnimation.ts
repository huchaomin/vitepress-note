/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 16:23:51
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-25 23:20:10
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
  tl.addLabel('mapBody', 3.5)
  tl.addLabel('mapParts', 4.5)
  tl.addLabel('province', 6.0)

  // 相机动画
  tl.add(
    gsap.to(_this.camera.instance.position, {
      duration: 8,
      ease: 'power1.in',
      onComplete: () => {
        _this.camera.controls.saveState()
      },
      y: 160,
      z: 80,
    }),
  )
  // 光晕旋转动画
  tl.add(
    gsap.to(halo.rotation, {
      duration: 8,
      z: -2 * Math.PI,
    }),
    '<',
  )
  // 光晕旋透明度
  tl.add(
    gsap.to(halo.material, {
      duration: 8,
      opacity: 0,
    }),
    '<',
  )
  // mapBody动画
  tl.add(
    gsap.to(mapGroup.position, {
      duration: 1.5,
      x: 0,
      y: 0,
      z: 0,
    }),
    'mapBody',
  )
  tl.add(
    gsap.to(mapGroup.scale, {
      duration: 1.5,
      ease: 'circ.out',
      x: 1,
      y: 1,
      z: 1,
    }),
    'mapBody',
  )

  _this.provinceMeshArr.forEach((mesh) => {
    tl.add(
      // top material
      gsap.to((mesh.material as THREE.MeshStandardMaterial[])[0], {
        duration: 1,
        ease: 'circ.out',
        opacity: 1,
      }),
      'mapParts',
    )
    tl.add(
      gsap.to(mesh.position, {
        duration: 1,
        ease: 'circ.out',
        x: 0,
        y: 0,
        z: 0,
      }),
      'mapParts',
    )
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
    'mapParts',
  )
  tl.add(
    gsap.to(provinceLineMaterial, {
      delay: 0.3,
      duration: 0.5,
      opacity: 1,
    }),
    'mapParts',
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
    'mapParts',
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
    'mapParts',
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
