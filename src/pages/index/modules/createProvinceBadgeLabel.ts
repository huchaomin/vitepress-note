/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-23 18:26:18
 * @Description  :
 */
import { Vector3 } from 'three'
import type { CanvasRenderType } from '../index'
import dataArr from '../data'
import type { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import labelArrow from '../assets/texture/label-arrow.png'

interface dataItem {
  adcode: number
  geometry: {
    coordinates: [number, number]
    type: string
  }
  value: number
}
function labelNameStyle(_this: CanvasRenderType, data: dataItem, position: Vector3): CSS3DSprite {
  const label = _this.label3d.create('', 'badges-label', true)
  label.init(
    `<div class="badges-label-wrap">
    平均工资：<span>${data.value}元</span>
    <img class="icon" src="${labelArrow}" alt="" />
  </div>`,
    position,
  )
  _this.label3d.setLabelStyle(label, 0.1, 'x')
  label.setParent(_this.mainSceneGroup)
  // label.hide()
  label.userData.adcode = data.adcode
  label.userData.position = [position.x, position.y, position.z]
  return label
}

export default (_this: CanvasRenderType) => {
  return (dataArr as dataItem[]).map((data) => {
    const [x, y] = _this.geoProjection(data.geometry.coordinates)!
    return labelNameStyle(_this, data, new Vector3(x, -y, _this.depth + 0.92))
  })
}