/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 14:24:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 18:12:26
 * @Description  :
 */
import { Fog, Color, Group } from 'three'
import { ThreeCore } from '@/components/three/core'
import type * as THREE from 'three'
import { InteractionManager } from 'three.interactive'
import AnyHistory from '@/components/three/utils/AnyHistory'
import loadAllAssets from './utils/loadAllAssets'
import type { AssetType } from '@/components/three/utils/Resource'
import createFloor from './modules/createFloor'
import createRotateBorder from './modules/createRotateBorder'
import createLight from './modules/createLight'
import createMap from './modules/createMap'
import createAnimation from './modules/createAnimation'

export default class CanvasRender extends ThreeCore {
  assets: AssetType[]
  depth: number
  eventElement: THREE.Mesh[]
  focusMapSideMaterial: THREE.MeshStandardMaterial
  history: AnyHistory
  interactionManager: InteractionManager
  pointCenter: [number, number]
  provinceLineMaterial: THREE.LineBasicMaterial
  rotateBorder1: THREE.Mesh
  rotateBorder2: THREE.Mesh
  constructor(
    canvas: ConstructorParameters<typeof ThreeCore>[0],
    config: ConstructorParameters<typeof ThreeCore>[1],
  ) {
    super(canvas, config)
    this.setAxesHelper()
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
    this.history = new AnyHistory()
    this.history.push({ name: '中国' })
    createLight(this)
    void loadAllAssets().then((res) => {
      this.assets = res
      console.log(this.assets)

      this.sceneGroup = new Group()
      this.mainSceneGroup = new Group()
      this.mainSceneGroup.rotateX(-Math.PI / 2)
      this.sceneGroup.add(this.mainSceneGroup)
      this.scene.add(this.sceneGroup)
      console.log(this.scene)

      // 创建底图
      const quan = createFloor(this)
      // 旋转边框
      createRotateBorder(this)
      // 创建地图
      createMap(this)
      // 创建进场动画
      createAnimation(this, {
        quan,
      })
    })
  }

  getAssetsData(name: string) {
    const result = this.assets.find((item) => item.name === name)
    if (result) {
      return result.data
    } else {
      throw new Error(`未找到${name}资源s`)
    }
  }
}

export type CanvasRenderType = InstanceType<typeof CanvasRender>
