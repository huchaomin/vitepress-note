/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-31 17:52:04
 * @Description  :
 */
import { Vector3 } from 'three'
import type { CanvasRenderType } from '../index'
import dataArr from '../data'
import type { labelInstance } from '@/components/three/utils/Label3d'
import { DotLottie } from '@lottiefiles/dotlottie-web'

interface dataItem {
  adcode: number
  geometry: {
    coordinates: [number, number]
    type: string
  }
  value: number
}
function addLabelBadge(_this: CanvasRenderType, data: dataItem, position: Vector3): labelInstance {
  const label = _this.label3d.create()
  label.init(
    `<div class="badges_label">
      <p>2024-10-24</p>
      <p>
        回款：<span class="amt">${data.value}元</span>
      </p>
    </div>`,
    position,
  )
  return label
}

function addLabelArrow(_this: CanvasRenderType, position: Vector3): labelInstance {
  const label = _this.label3d.create()
  const id = useUniqueId()
  label.init(`<canvas id="${id}" width="30" height="30"></canvas>`, position)
  setTimeout(() => {
    // eslint-disable-next-line no-new
    new DotLottie({
      autoplay: true,
      canvas: document.querySelector(`#${id}`) as HTMLCanvasElement,
      loop: true,
      src: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie', // or .json file
    })
  }, 3000)
  return label
}

export default (_this: CanvasRenderType) => {
  const badgeArr: labelInstance[] = []
  const arrowArr: labelInstance[] = []
  ;(dataArr as dataItem[]).forEach((data) => {
    const [x, y] = _this.geoProjection(data.geometry.coordinates)!
    const position = new Vector3(x, -y, _this.depth + 0.92)
    const badge = addLabelBadge(_this, data, position)
    const arrow = addLabelArrow(_this, position)
    ;[badge, arrow].forEach((item) => {
      item.userData = {
        adcode: data.adcode,
        position: [position.x, position.y, position.z],
      }
      // TODO
      // label.hide()
      _this.mainSceneGroup.add(item)
    })
    badgeArr.push(badge)
    arrowArr.push(arrow)
  })
  return { arrowArr, badgeArr }
}
