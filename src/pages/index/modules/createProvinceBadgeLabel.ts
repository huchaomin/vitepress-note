/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-30 00:08:32
 * @Description  :
 */
import { Vector3 } from 'three'
import type { CanvasRenderType } from '../index'
import dataArr from '../data'
import type { labelInstance } from '@/components/three/utils/Label3d'
import labelArrow from '../assets/texture/label_arrow.png'

interface dataItem {
  adcode: number
  geometry: {
    coordinates: [number, number]
    type: string
  }
  value: number
}
function labelNameStyle(_this: CanvasRenderType, data: dataItem, position: Vector3): labelInstance {
  const label = _this.label3d.create('badges_label_wrap')
  label.init(
    `<div class="badges_label">
      <div>2024-10-24</div>
      <div>
        回款：<span class="amt">${data.value}元</span>
      </div>
      <div class="icon_wrapper">
        <img class="icon" src="${labelArrow}" alt="" />
      </div>
    </div>`,
    position,
  )
  label.scale.set(0.15, 0.15, 0.15) // 根据相机渲染范围控制HTML 3D标签尺寸
  // label.rotation.x = Math.PI / 2 // 控制HTML标签CSS3对象角度,
  _this.mainSceneGroup.add(label)
  // TODO
  // label.hide()
  label.userData = {
    adcode: data.adcode,
    position: [position.x, position.y, position.z],
  }
  return label
}

export default (_this: CanvasRenderType) => {
  return (dataArr as dataItem[]).map((data) => {
    const [x, y] = _this.geoProjection(data.geometry.coordinates)!
    return labelNameStyle(_this, data, new Vector3(x, -y, _this.depth + 0.92))
  })
}
