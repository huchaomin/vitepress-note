import { PlaneGeometry, MeshBasicMaterial, Mesh, AdditiveBlending } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

export default (_this: CanvasRenderType) => {
  const max = 100
  const rotationBorder1 = _this.getAssetsData('rotationBorder1') as THREE.Texture
  _this.rotateBorder1 = new Mesh(
    new PlaneGeometry(max * 1.178, max * 1.178),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      color: 0x48afff,
      depthWrite: false,
      map: rotationBorder1,
      opacity: 0.2,
      transparent: true,
    }),
  )
  _this.rotateBorder1.rotateX(-Math.PI / 2)
  _this.rotateBorder1.position.set(0, 0.07, 0)
  _this.rotateBorder1.scale.set(0, 0, 0)
  _this.rotateBorder1.renderOrder = 6
  _this.scene.add(_this.rotateBorder1)

  const rotationBorder2 = _this.getAssetsData('rotationBorder2') as THREE.Texture
  _this.rotateBorder2 = new Mesh(
    new PlaneGeometry(max * 1.116, max * 1.116),
    new MeshBasicMaterial({
      blending: AdditiveBlending,
      color: 0x48afff,
      depthWrite: false,
      map: rotationBorder2,
      opacity: 0.4,
      transparent: true,
    }),
  )
  _this.rotateBorder2.rotateX(-Math.PI / 2)
  _this.rotateBorder2.position.set(0, 0.06, 0)
  _this.rotateBorder2.scale.set(0, 0, 0)
  _this.rotateBorder2.renderOrder = 6
  _this.scene.add(_this.rotateBorder2)
  _this.time.on('tick', () => {
    _this.rotateBorder1.rotation.z += 0.001
    _this.rotateBorder2.rotation.z += -0.004
  })
}
