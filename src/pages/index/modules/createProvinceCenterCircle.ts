/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 17:27:35
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 17:43:15
 * @Description  :
 */
import { PlaneGeometry, MeshBasicMaterial, AdditiveBlending, Mesh, Group } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

interface province {
  adcode: number
  center: [number, number]
  centroid: [number, number]
  name: string
}

export default (_this: CanvasRenderType): THREE.Group[] => {
  const provinceConfig = JSON.parse(_this.getAssetsData('province') as string) as province[]
  return provinceConfig.map((data) => {
    const guangquan1 = _this.getAssetsData('guangquan1') as THREE.Texture
    const guangquan2 = _this.getAssetsData('guangquan2') as THREE.Texture
    const geometry = new PlaneGeometry(2, 2)

    const material1 = new MeshBasicMaterial({
      alphaMap: guangquan1,
      blending: AdditiveBlending,
      color: 0xffffff,
      depthTest: false,
      fog: false,
      map: guangquan1,
      opacity: 1,
      transparent: true,
    })
    const material2 = new MeshBasicMaterial({
      alphaMap: guangquan2,
      blending: AdditiveBlending,
      color: 0xffffff,
      depthTest: false,
      fog: false,
      map: guangquan2,
      opacity: 1,
      transparent: true,
    })
    const mesh1 = new Mesh(geometry, material1)
    mesh1.renderOrder = 24
    mesh1.scale.set(0, 0, 0)
    _this.time.on('tick', (delta) => {
      mesh1.rotation.z += delta * 2
    })
    const mesh2 = new Mesh(geometry, material2)
    mesh2.renderOrder = 24
    mesh2.position.z -= 0.001
    mesh2.scale.set(0, 0, 0)
    const group = new Group()
    group.add(mesh1, mesh2)
    const [x, y] = _this.geoProjection(data.centroid)!
    group.position.set(x, -y, _this.depth + 0.46)
    group.userData = {
      adcode: data.adcode,
      name: data.name,
      position: [x, -y, _this.depth + 0.46],
    }
    _this.mainSceneGroup.add(group)
    return group
  })
}
