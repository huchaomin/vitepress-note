/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:21:43
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 16:32:59
 * @Description  :
 */

import {
  PlaneGeometry,
  SRGBColorSpace,
  RepeatWrapping,
  MeshBasicMaterial,
  Mesh,
  AdditiveBlending,
} from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

export default (_this: CanvasRenderType) => {
  const geometry = new PlaneGeometry(200, 200)
  const texture = _this.getAssetsData('gaoguang1') as THREE.Texture
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(1, 1)
  const material = new MeshBasicMaterial({
    blending: AdditiveBlending,
    map: texture,
    opacity: 1,
    transparent: true,
  })
  const mesh = new Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  mesh.position.set(0, 0.05, 0)
  _this.scene.add(mesh)

  const quanTexture = _this.getAssetsData('quan') as THREE.Texture

  const quan = new Mesh(
    new PlaneGeometry(250, 250),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      depthTest: false,
      map: quanTexture,
      opacity: 1,
      transparent: true,
    }),
  )
  quan.rotateX(-Math.PI / 2)
  quan.position.set(0, _this.depth + 2.05, 0)
  _this.scene.add(quan)
  return quan
}
