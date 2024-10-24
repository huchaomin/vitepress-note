/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 14:24:06
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-25 00:10:20
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
import createMouseEvent from './modules/createMouseEvent'
import createProvinceNameLabel from './modules/createProvinceNameLabel'
import createProvinceCenterCircle from './modules/createProvinceCenterCircle'
import createProvinceBadgeLabel from './modules/createProvinceBadgeLabel'
import createMapStroke from './modules/createMapStroke'

export default class CanvasRender extends ThreeCore {
  assets: AssetType[]
  depth: number
  eventElement: THREE.Mesh[]
  interactionManager: InteractionManager
  label3d: Label3d
  mainSceneGroup: Group
  pointCenter: [number, number]
  constructor(
    canvas: ConstructorParameters<typeof ThreeCore>[0],
    config: ConstructorParameters<typeof ThreeCore>[1],
  ) {
    super(canvas, config)
    // 中心坐标
    this.pointCenter = [108.55, 34.32]
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
    this.label3d = new Label3d(this)
    void loadAllAssets().then((res) => {
      this.assets = res
      this.mainSceneGroup = new Group()
      this.mainSceneGroup.rotateX(-Math.PI / 2)
      this.scene.add(this.mainSceneGroup)
      // 创建环境光
      createEnvLight(this)
      // 创建周围光晕
      const halo = createHalo(this)
      // 创建背景光
      createBgLight(this)
      // 旋转边框
      const { rotateBorder1, rotateBorder2 } = createRotateBorder(this)
      // TODO getCoordinates 创建地图
      const {
        group: mapGroup,
        provinceLineMaterial,
        sideMaterial: mapSideMaterial,
      } = createMap(this)
      // 创建地图描边
      createMapStroke(this)
      // 创建省份名称标签
      const provinceNameLabelArr = createProvinceNameLabel(this)
      // 创建省份中心圆
      const provinceCenterCircleArr = createProvinceCenterCircle(this)
      // 创建省份徽章标签
      const provinceBadgeLabelArr = createProvinceBadgeLabel(this)
      // 创建鼠标事件
      createMouseEvent(this, {
        provinceBadgeLabelArr,
        provinceCenterCircleArr,
        provinceNameLabelArr,
      })
      // 创建进场动画
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
    // TODO rESOURCE dESTROY?
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
