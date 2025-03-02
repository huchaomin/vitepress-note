/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 14:24:06
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-12-31 14:14:52
 * @Description  :
 */
import type { AssetType } from '@/components/three/utils/Resource'

import { ThreeCore } from '@/components/three/core'
import Label3d from '@/components/three/utils/Label3d'
import { Color, Fog, Group } from 'three'
import { InteractionManager } from 'three.interactive'

import createAnimation from './modules/createAnimation'
import createBgLight from './modules/createBgLight'
import createEnvLight from './modules/createEnvLight'
import createEvent from './modules/createEvent'
import createHalo from './modules/createHalo'
import createMap from './modules/createMap'
import createMapStroke from './modules/createMapStroke'
import createProvinceItem from './modules/createProvinceItem'
import createRotateBorder from './modules/createRotateBorder'
import loadAllAssets from './utils/loadAllAssets'

export type CanvasRenderType = InstanceType<typeof CanvasRender>

export default class CanvasRender extends ThreeCore {
  assets: AssetType[]
  depth: number
  interactionManager: InteractionManager
  label3d: Label3d
  mapSceneGroup: Group
  constructor(
    canvas: ConstructorParameters<typeof ThreeCore>[0],
    config?: ConstructorParameters<typeof ThreeCore>[1],
  ) {
    super(canvas, config)
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
    this.mapSceneGroup.position.set(-4, 0, 36)
    this.mapSceneGroup.rotateY(-Math.PI / 8)
    this.mapSceneGroup.rotateZ(Math.PI / 2 / 18)
    this.scene.add(this.mapSceneGroup)

    this.label3d = new Label3d(this)
    this.assets = []

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
        mapGroup,
        provinceArrowLabelArr,
        provinceBadgeLabelArr,
        provinceCenterCircleArr,
        provinceNameLabelArr,
      })
      // 创建动画
      createAnimation(this, {
        halo,
        mapGroup,
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
