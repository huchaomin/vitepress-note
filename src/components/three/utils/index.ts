/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 13:46:44
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 15:19:01
 * @Description  :
 */

import type * as THREE from 'three'
import { Vector3, Box3 } from 'three'

interface GeoJSON {
  features: Array<{
    geometry: {
      coordinates: [number, number][][][]
      type: string
    }
    properties: {
      adcode: number
      center: [number, number]
      centroid?: [number, number]
      childrenNum: number
      name: string
    }
    type: string
  }>
  type: string
}
function transformMapGeoJSON(jsonString: string): GeoJSON {
  const data = JSON.parse(jsonString) as GeoJSON
  const features = data.features
  for (let i = 0; i < features.length; i++) {
    const element = features[i]
    if (element.geometry.type === 'Polygon') {
      element.geometry.coordinates = [
        element.geometry.coordinates as unknown as [number, number][][],
      ]
    }
  }
  return data
}

/**
 * 获取网格的包围盒
 */
function getBoundBox(group: THREE.Group) {
  // 计算实际宽高
  const size = new Vector3()
  // 包围盒计算模型对象的大小和位置
  const box3 = new Box3()
  box3.expandByObject(group) // 计算模型包围盒
  const boxSize = new Vector3()
  box3.getSize(boxSize) // 计算包围盒尺寸
  const center = new Vector3()
  box3.getCenter(center) // 计算一个层级模型对应包围盒的几何体中心坐标
  const obj = {
    box3,
    boxSize,
    center,
  }
  // TODO
  if (group.geometry) {
    group.geometry.computeBoundingBox()
    group.geometry.computeBoundingSphere()
    const { max, min } = group.geometry.boundingBox
    size.x = max.x - min.x
    size.y = max.y - min.y
    size.z = max.z - min.z
    obj.size = size
  }
  return obj
}

function calcUv2(
  geometry: THREE.BufferGeometry,
  width: number,
  height: number,
  minX: number,
  minY: number,
) {
  const positionAttribute = geometry.attributes.position
  const uvAttribute = geometry.attributes.uv
  const count = geometry.groups[0].count
  for (let i = 0; i < count; i++) {
    const x = positionAttribute.getX(i)
    const y = positionAttribute.getY(i)
    const u = (x - minX) / width
    const v = (y - minY) / height
    uvAttribute.setXY(i, u, v)
  }
  uvAttribute.needsUpdate = true
  geometry.computeVertexNormals()
}

export { calcUv2, getBoundBox, transformMapGeoJSON }
