/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-23 14:48:09
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 14:28:00
 * @Description  :
 */
import { Vector3, Group, PlaneGeometry, MeshBasicMaterial, AdditiveBlending, Mesh } from 'three'
import type { CanvasRenderType } from '../index'
import type * as THREE from 'three'
import type { labelInstance } from '@/components/three/utils/Label3d'
import arrowDown from '../assets/texture/arrow_down.gif'

interface province {
  adcode: number
  centroid: [number, number]
  name: string
}

function addLabelBadge(_this: CanvasRenderType, position: Vector3): labelInstance {
  const label = _this.label3d.create('badges_label_wrapper')
  label.init(
    `<div class="badges_label">
      <p>2024-10-24</p>
      <p>
        回款：<span class="amt">${getRandomInt()}元</span>
      </p>
    </div>`,
    position,
  )
  return label
}

function addLabelName(_this: CanvasRenderType, position: Vector3, data: province): labelInstance {
  const label = _this.label3d.create('provinces_name')
  label.init(`${data.name}`, position)
  return label
}

function addLabelArrow(_this: CanvasRenderType, position: Vector3): labelInstance {
  const label = _this.label3d.create('arrow_down_icon_wrapper')
  label.init(`<img class="arrow_down_icon" src="${arrowDown}" alt="" />`, position)
  return label
}

function addCenterCircle(_this: CanvasRenderType, position: THREE.Vector3) {
  const circle1 = _this.getAssetsData('circle1') as THREE.Texture
  const circle2 = _this.getAssetsData('circle2') as THREE.Texture
  const geometry = new PlaneGeometry(2, 2)
  const material1 = new MeshBasicMaterial({
    alphaMap: circle1,
    blending: AdditiveBlending,
    color: 0xffffff,
    depthTest: false,
    fog: false,
    map: circle1,
    opacity: 1,
    transparent: true,
  })
  const material2 = new MeshBasicMaterial({
    alphaMap: circle2,
    blending: AdditiveBlending,
    color: 0xffffff,
    depthTest: false,
    fog: false,
    map: circle2,
    opacity: 1,
    transparent: true,
  })
  const mesh1 = new Mesh(geometry, material1)
  mesh1.renderOrder = 24
  mesh1.scale.set(0, 0, 0)
  mesh1.userData = {
    type: 'inner',
  }
  const mesh2 = new Mesh(geometry, material2)
  mesh2.renderOrder = 24
  mesh2.scale.set(0, 0, 0)
  const group = new Group()
  group.add(mesh1, mesh2)
  group.position.copy(position)
  return group
}

function getRandomInt(): number {
  return Math.floor(Math.random() * 11)
}

export default (_this: CanvasRenderType, mapGroup: THREE.Group) => {
  const badgeArr: labelInstance[] = []
  const arrowArr: labelInstance[] = []
  const nameArr: labelInstance[] = []
  const centerCircleArr: THREE.Group[] = []

  mapGroup.children
    .filter((tempGroup) => {
      return tempGroup.userData.centroid !== undefined && tempGroup.userData.name !== ''
    })
    .forEach((group) => {
      const [x, y] = _this.geoProjection((group.userData as province).centroid, true)!
      const position = new Vector3(x, -y, _this.depth + 0.1)
      const badge = addLabelBadge(_this, position)
      const arrow = addLabelArrow(_this, position)
      const name = addLabelName(_this, position, group.userData as province)
      const centerCircle = addCenterCircle(_this, position)
      ;[badge, arrow, name, centerCircle].forEach((item) => {
        item.userData = {
          adcode: (group.userData as province).adcode,
          position: [position.x, position.y, position.z],
        }
      })
      badgeArr.push(badge)
      arrowArr.push(arrow)
      nameArr.push(name)
      centerCircleArr.push(centerCircle)
    })
  _this.mapSceneGroup.add(
    new Group().add(...badgeArr),
    new Group().add(...arrowArr),
    new Group().add(...nameArr),
    new Group().add(...centerCircleArr),
  )
  return { arrowArr, badgeArr, centerCircleArr, nameArr }
}
