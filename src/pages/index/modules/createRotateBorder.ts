/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 16:23:51
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 11:37:08
 * @Description  : 地图下面的旋转边框
 */

import { PlaneGeometry, MeshBasicMaterial, Mesh, AdditiveBlending } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

export default (_this: CanvasRenderType) => {
  const max = 100
  const rotationBorder1Texture = _this.getAssetsData('rotationBorder1') as THREE.Texture
  const rotateBorder1 = new Mesh(
    new PlaneGeometry(max * 1.178, max * 1.178),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      color: 0x48afff,
      depthWrite: false,
      map: rotationBorder1Texture,
      opacity: 0.2,
      transparent: true,
    }),
  )
  rotateBorder1.position.set(0, 0, 0.04)
  rotateBorder1.scale.set(0, 0, 0)
  rotateBorder1.renderOrder = 6

  const rotationBorder2Texture = _this.getAssetsData('rotationBorder2') as THREE.Texture
  const rotateBorder2 = new Mesh(
    new PlaneGeometry(max * 1.116, max * 1.116),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      color: 0x48afff,
      depthWrite: false,
      map: rotationBorder2Texture,
      opacity: 0.4,
      transparent: true,
    }),
  )
  rotateBorder2.position.set(0, 0, 0.05)
  rotateBorder2.scale.set(0, 0, 0)
  rotateBorder2.renderOrder = 6
  _this.scene.add(rotateBorder1, rotateBorder2)
  _this.time.on('tick', () => {
    rotateBorder1.rotation.z += 0.002
    rotateBorder2.rotation.z += -0.008
  })
  return { rotateBorder1, rotateBorder2 }
}
