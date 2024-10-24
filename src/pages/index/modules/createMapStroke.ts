/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:36:42
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 12:18:44
 * @Description  :
 */

import {
  RepeatWrapping,
  CatmullRomCurve3,
  Vector3,
  TubeGeometry,
  Mesh,
  MeshBasicMaterial,
  AdditiveBlending,
  Group,
} from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

interface chinaStrokeType {
  features: {
    geometry: {
      coordinates: [number, number][][][]
    }
  }[]
}

export default (_this: CanvasRenderType) => {
  const texture = _this.getAssetsData('pathLine2') as THREE.Texture
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(1, 1)
  const mapJsonData = JSON.parse(_this.getAssetsData('chinaStorke') as string) as chinaStrokeType
  const data = mapJsonData.features.map((path) => {
    return {
      geometry: path.geometry,
    }
  })
  const group = new Group()
  data.forEach((path) => {
    const pathPoint: THREE.Vector3[] = []
    path.geometry.coordinates.forEach((coord) => {
      coord[0].forEach((item) => {
        const [x, y] = _this.geoProjection(item)!
        pathPoint.push(new Vector3(x, -y, 0))
      })
    })
    const curve = new CatmullRomCurve3(pathPoint)
    const tubeGeometry = new TubeGeometry(curve, 256 * 10, 0.2, 4, false)
    const mesh = new Mesh(
      tubeGeometry,
      new MeshBasicMaterial({
        alphaMap: texture,
        blending: AdditiveBlending,
        color: 0x2bc4dc,
        fog: false,
        map: texture,
        opacity: 1,
        transparent: true,
      }),
    )
    mesh.position.set(0, 0, _this.depth + 0.42)
    mesh.renderOrder = 21
    group.add(mesh)
  })
  group.visible = true
  _this.mainSceneGroup.add(group)
  _this.time.on('tick', (delta) => {
    if (group.visible) {
      texture.offset.x += 0.1 * delta
    }
  })
  function setGroupVisible(visible: boolean) {
    group.visible = visible
  }
  return {
    group,
    setGroupVisible,
  }
}
