/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:36:42
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 15:22:25
 * @Description  :
 */

import { PointLight, AmbientLight, DirectionalLight } from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

// 创建点光源并添加到场景中
function createPointLight(
  pointParams: ConstructorParameters<typeof PointLight>,
  position: Parameters<InstanceType<typeof THREE.Vector3>['set']>,
) {
  const pointLight = new PointLight(...pointParams)
  pointLight.position.set(...position)
  return pointLight
}
export default (_this: CanvasRenderType) => {
  const sun = new AmbientLight(0x056a96, 2)
  // 方向光
  const directionalLight = new DirectionalLight(0x056a96, 4)
  directionalLight.position.set(-30, -8, 6)
  directionalLight.castShadow = true
  directionalLight.shadow.radius = 20
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024

  _this.scene.add(
    sun,
    directionalLight,
    createPointLight([0x0e81fb, 160, 10000, 1], [-3, -3, 16]),
    createPointLight([0x1f5f7a, 100, 100, 1], [-4, 43, 8]),
  )
}
