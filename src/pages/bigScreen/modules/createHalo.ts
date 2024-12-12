/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:21:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 11:30:39
 * @Description  :
 */

import { PlaneGeometry, MeshBasicMaterial, Mesh, AdditiveBlending } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

export default (_this: CanvasRenderType): THREE.Mesh => {
  const haloTexture = _this.getAssetsData('halo') as THREE.Texture
  const halo = new Mesh(
    new PlaneGeometry(210, 210),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      depthTest: false,
      map: haloTexture,
      opacity: 1,
      transparent: true,
    }),
  )
  halo.position.set(0, 0, 0.03)

  _this.scene.add(halo)
  return halo
}
