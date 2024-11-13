/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 14:24:06
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 09:14:56
 * @Description  :
 */
import { Fog, Color, Group } from 'three'
import { ThreeCore } from '@/components/three/core'
import type * as THREE from 'three'
import { InteractionManager } from 'three.interactive'
import Label3d from '@/components/three/utils/Label3d'
import loadAllAssets from './utils/loadAllAssets'
import type { AssetType } from '@/components/three/utils/Resource'
import createBgLight from './modules/createBgLight'
import createHalo from './modules/createHalo'
import createRotateBorder from './modules/createRotateBorder'
import createEnvLight from './modules/createEnvLight'
import createMap from './modules/createMap'
import createAnimation from './modules/createAnimation'
import createEvent from './modules/createEvent'
import createProvinceItem from './modules/createProvinceItem'
import createMapStroke from './modules/createMapStroke'

export default class CanvasRender extends ThreeCore {
  assets: AssetType[]
  depth: number
  interactionManager: InteractionManager
  label3d: Label3d
  mapSceneGroup: Group
  provinceMeshArr: THREE.Mesh[]
  constructor(
    canvas: ConstructorParameters<typeof ThreeCore>[0],
    config?: ConstructorParameters<typeof ThreeCore>[1],
  ) {
    super(canvas, config)
    this.setAxesHelper()
    // 中心坐标
    this.depth = 5
    this.scene.fog = new Fog(0x011024, 1, 500)
    this.scene.background = new Color(0x011024)
    // 设置相机位置及远近裁剪面
    this.camera.instance.position.set(0, 0, 255)
    this.camera.instance.updateProjectionMatrix()
    // 交互管理器
    this.interactionManager = new InteractionManager(
      this.renderer.instance,
      this.camera.instance,
      this.canvas,
    )
    this.mapSceneGroup = new Group()
    this.mapSceneGroup.position.set(-6, 0, 36)
    this.mapSceneGroup.rotateY(-Math.PI / 8)
    this.mapSceneGroup.rotateZ(Math.PI / 2 / 18)
    this.scene.add(this.mapSceneGroup)

    this.label3d = new Label3d(this)
    this.assets = []
    this.provinceMeshArr = []

    void loadAllAssets().then((res) => {
      this.assets = res
      // 注意z-index
      // createGridRipple 0.01
      // createBgLight 0.02
      // createHalo 0.03
      // createRotateBorder 0.04 0.05
      // 创建环境光
      createEnvLight(this)
      // 创建周围光晕
      const halo = createHalo(this)
      // 创建背景光
      createBgLight(this)
      // 旋转边框
      const { rotateBorder1, rotateBorder2 } = createRotateBorder(this)
      const {
        group: mapGroup,
        provinceLineMaterial,
        sideMaterial: mapSideMaterial,
      } = createMap(this)
      // 创建地图描边
      createMapStroke(this)
      // 创建省份名称标签
      // 创建省份中心圆
      // 创建省份徽章标签
      const {
        arrowArr: provinceArrowLabelArr,
        badgeArr: provinceBadgeLabelArr,
        centerCircleArr: provinceCenterCircleArr,
        nameArr: provinceNameLabelArr,
      } = createProvinceItem(this, mapGroup)
      // 创建事件
      createEvent(this, {
        provinceArrowLabelArr,
        provinceBadgeLabelArr,
        provinceCenterCircleArr,
        provinceNameLabelArr,
      })
      // 创建动画
      createAnimation(this, {
        halo,
        mapSideMaterial,
        provinceCenterCircleArr,
        provinceLineMaterial,
        provinceNameLabelArr,
        rotateBorder1,
        rotateBorder2,
      })
    })
  }

  destroy() {
    super.destroy()
    this.label3d.destroy()
    this.interactionManager.dispose()
  }

  getAssetsData(name: string) {
    const result = this.assets.find((item) => item.name === name)
    if (result) {
      return result.data
    } else {
      throw new Error(`未找到${name}资源s`)
    }
  }

  // 在 ThreeCore tick 事件中调用
  update() {
    // 调用 ThreeCore 中的 update 方法
    super.update()
    this.interactionManager.update()
  }
}

export type CanvasRenderType = InstanceType<typeof CanvasRender>
