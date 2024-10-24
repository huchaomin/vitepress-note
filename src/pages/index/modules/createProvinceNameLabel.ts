/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 10:27:11
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

function labelNameStyle(_this: CanvasRenderType, data: province, position: THREE.Vector3) {
  const label = _this.label3d.create('', 'provinces_name_label', true)
  label.init(`${data.name}`, position)
  _this.label3d.setLabelStyle(label, 0.08, 'x')
  label.setParent(_this.mainSceneGroup)
  label.userData.adcode = data.adcode
  label.userData.position = [position.x, position.y, position.z]
  return label
}

export default (_this: CanvasRenderType) => {
  const provinceConfig = JSON.parse(_this.getAssetsData('province') as string) as province[]
  return provinceConfig.map((data) => {
    const [x, y] = _this.geoProjection(data.centroid)!
    return labelNameStyle(_this, data, new Vector3(x, -y - 1.5, _this.depth + 0.4))
  })
}
