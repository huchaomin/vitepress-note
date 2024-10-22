/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 14:24:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 09:28:18
 * @Description  :
 */
import { Fog, Color, PointLight, AmbientLight, DirectionalLight } from 'three'
import { ThreeCore } from '@/components/three/core'
import type * as THREE from 'three'
import { InteractionManager } from 'three.interactive'
import AnyHistory from '@/components/three/utils/AnyHistory'
import loadAllAssets from './utils/loadAllAssets'

export default class CanvasRender extends ThreeCore {
  history: AnyHistory
  interactionManager: InteractionManager
  pointCenter: ConstructorParameters<typeof THREE.Vector2>
  constructor(
    canvas: ConstructorParameters<typeof ThreeCore>[0],
    config: ConstructorParameters<typeof ThreeCore>[1],
  ) {
    super(canvas, config)
    // 中心坐标
    this.pointCenter = [108.55, 34.32]
    this.flyLineCenter = [116.41995, 40.18994]
    this.depth = 5
    this.scene.fog = new Fog(0x011024, 1, 500)
    this.scene.background = new Color(0x011024)
    // 设置相机位置及远近裁剪面
    this.camera.instance.position.set(
      0.00002366776247217723,
      225.1025284992283,
      0.0002238648924037432,
    )
    this.camera.instance.near = 1
    this.camera.instance.far = 10000
    this.camera.instance.updateProjectionMatrix()
    // 交互管理器
    this.interactionManager = new InteractionManager(
      this.renderer.instance,
      this.camera.instance,
      this.canvas,
    )

    this.renderer.resize()
    this.initLight()
    this.history = new AnyHistory()
    this.history.push({ name: '中国' })
    void loadAllAssets().then(() => {})
  }

  // 创建点光源并添加到场景中
  createPointLight(
    pointParams: ConstructorParameters<typeof PointLight>,
    position: Parameters<InstanceType<typeof THREE.Vector3>['set']>,
  ) {
    const pointLight = new PointLight(...pointParams)
    pointLight.position.set(...position)
    this.scene.add(pointLight)
  }

  // 初始化灯光
  initLight() {
    const sun = new AmbientLight(0xffffff, 2)
    this.scene.add(sun)
    // 方向光
    const directionalLight = new DirectionalLight(0xffffff, 4)
    directionalLight.position.set(-30, 6, -8)
    directionalLight.castShadow = true
    directionalLight.shadow.radius = 20
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    this.scene.add(directionalLight)
    this.createPointLight([0x0e81fb, 160, 10000, 1], [-3, 16, -3])
    this.createPointLight([0x1f5f7a, 100, 100, 1], [-4, 8, 43])
  }
}
