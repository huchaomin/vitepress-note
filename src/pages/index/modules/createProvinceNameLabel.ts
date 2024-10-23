/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 15:50:02
 * @Description  :
 */
import { Vector3 } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

interface province {
  adcode: number
  center: [number, number]
  centroid: [number, number]
  name: string
}

function labelNameStyle(
  _this: CanvasRenderType,
  data: province,
  index: number,
  position: THREE.Vector3,
) {
  const label = _this.label3d.create('', 'provinces-name-label', true)
  label.init(
    `<div class="provinces-name-label"><div class="provinces-name-label-wrap">${data.name}</div></div>`,
    position,
  )
  _this.label3d.setLabelStyle(label, 0.08, 'x')
  label.setParent(_this.mainSceneGroup)
  label.userData.adcode = data.adcode
  label.userData.position = [position.x, position.y, position.z]
  console.log('label', label)

  return label
}

export default (_this: CanvasRenderType) => {
  const provinceConfig = JSON.parse(_this.getAssetsData('province') as string) as province[]
  return provinceConfig.map((data, index) => {
    const [x, y] = _this.geoProjection(data.centroid)!
    return labelNameStyle(_this, data, index, new Vector3(x, -y - 1.5, _this.depth + 0.4))
  })
}
