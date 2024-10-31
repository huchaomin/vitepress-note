/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-29 23:43:11
 * @Description  :
 */
import { Vector3 } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'
import type { labelInstance } from '@/components/three/utils/Label3d'

interface province {
  adcode: number
  centroid: [number, number]
  name: string
}

function labelNameStyle(
  _this: CanvasRenderType,
  data: province,
  position: THREE.Vector3,
): labelInstance {
  const label = _this.label3d.create('provinces_name_label')
  label.init(`${data.name}`, position)
  _this.mainSceneGroup.add(label)
  label.userData.adcode = data.adcode
  label.userData.position = [position.x, position.y, position.z]
  return label
}

export default (_this: CanvasRenderType, mapGroup: THREE.Group) => {
  return mapGroup.children
    .filter((c) => {
      return (
        c.userData.type === 'shape' && c.userData.centroid !== undefined && c.userData.name !== ''
      )
    })
    .map((group) => {
      const [x, y] = _this.geoProjection((group.userData as province).centroid)!
      return labelNameStyle(
        _this,
        group.userData as province,
        new Vector3(x, -y - 1.5, _this.depth + 0.4),
      )
    })
}
