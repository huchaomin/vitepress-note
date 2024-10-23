/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 16:23:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 17:47:39
 * @Description  :
 */
import gsap from 'gsap'
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import createGridRipple from './createGridRipple'

export default (
  _this: CanvasRenderType,
  {
    provinceCenterCircleArr,
    provinceNameLabelArr,
    quan,
  }: {
    provinceCenterCircleArr: THREE.Group[]
    quan: THREE.Mesh
  },
) => {
  const tl = gsap.timeline()
  tl.addLabel('focusMap', 3.5)
  tl.addLabel('focusMapOpacity', 4.0)
  tl.addLabel('bar', 5.0)

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
    gsap.to(quan.rotation, {
      duration: 5,
      z: -2 * Math.PI,
    }),
    '-=2',
  )
  tl.add(
    gsap.to(_this.focusMapGroup.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
    }),
    'focusMap',
  )

  tl.add(
    gsap.to(_this.focusMapGroup.scale, {
      duration: 1,
      ease: 'circ.out',
      x: 1,
      y: 1,
      z: 1,
    }),
    'focusMap',
  )

  _this.provinceMesh.traverse((obj) => {
    if (obj.isMesh) {
      tl.add(
        gsap.to(obj.material[0], {
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
    gsap.to(_this.focusMapSideMaterial, {
      duration: 1,
      ease: 'circ.out',
      onComplete: () => {
        // TODO
        // _this.createMapMirror()
        createGridRipple(_this)
      },
      opacity: 1,
    }),
    'focusMapOpacity',
  )

  tl.add(
    gsap.to(_this.provinceLineMaterial, {
      delay: 0.3,
      duration: 0.5,
      opacity: 1,
    }),
    'focusMapOpacity',
  )

  tl.add(
    gsap.to(_this.rotateBorder1.scale, {
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
    gsap.to(_this.rotateBorder2.scale, {
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
    const element = item.element.querySelector('.provinces-name-label-wrap')
    tl.add(
      gsap.to(element, {
        delay: 0.05 * index,
        duration: 0.5,
        ease: 'circ.out',
        opacity: 1,
        translateY: 0,
      }),
      'bar',
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
      'bar',
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
      'bar',
    )
  })
}
