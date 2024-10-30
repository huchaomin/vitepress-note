/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 09:04:40
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 17:31:14
 * @Description  :
 */
import {
  Fog,
  Group,
  MeshBasicMaterial,
  DirectionalLight,
  DirectionalLightHelper,
  AmbientLight,
  PointLight,
  Vector3,
  PointLightHelper,
  LineBasicMaterial,
  Color,
  MeshStandardMaterial,
  PlaneGeometry,
  PointsMaterial,
  Mesh,
  DoubleSide,
  RepeatWrapping,
  SRGBColorSpace,
  AdditiveBlending,
  NearestFilter,
  BoxGeometry,
  SpriteMaterial,
  Sprite,
} from "three"
import {
  Mini3d,
  Debug,
  Particles,
  FlyLine,
  PathLine,
  Label3d,
  ToastLoading,
  Plane,
  GradientShader,
  getBoundBox,
  createHistory,
} from "@/mini3d"
import stats from "three/examples/jsm/libs/stats.module"
import { Assets } from "./map/assets"
import { ExtrudeMap } from "./map/extrudeMap"

import { DiffuseShader } from "./map/DiffuseShader"

import labelArrow from "@/assets/texture/label-arrow.png"

import provincesData from "./map/provincesData"
import scatterData from "./map/scatter"
import badgesData from "./map/badgesData"

import { Reflector } from "./map/Reflector.js"
import { InteractionManager } from "three.interactive"
import { ChildMap } from "./map-china-child"
import gsap from "gsap"
// 排序
function sortByValue(data) {
  data.sort((a, b) => b.value - a.value)
  return data
}
// 资源加载
let base_url = import.meta.env.BASE_URL
export class World extends Mini3d {
  constructor(canvas, config) {
    super(canvas, config)
    // 中心坐标
    this.pointCenter = [108.55, 34.32]
    this.flyLineCenter = [116.41995, 40.18994]
    this.depth = 5
    this.scene.fog = new Fog(0x011024, 1, 500)
    this.scene.background = new Color(0x011024)
    this.camera.instance.position.set(0.00002366776247217723, 225.1025284992283, 0.0002238648924037432)
    this.camera.instance.near = 1
    this.camera.instance.far = 10000
    this.camera.instance.updateProjectionMatrix()
    // 交互管理器
    this.interactionManager = new InteractionManager(this.renderer.instance, this.camera.instance, this.canvas)
    this.toastLoading = new ToastLoading()
    this.returnBtn = document.querySelector(".return-btn")
    this.clicked = false // 是否已经点击
    this.currentScene = "mainScene" // 当前场景 mainScene | childScene
    this.assets = new Assets(() => {
      // 场景组
      this.sceneGroup = new Group()
      this.mainSceneGroup = new Group()
      this.childSceneGroup = new Group()
      this.labelGroup = new Group()
      this.gqGroup = new Group() // 光圈组
      this.provinceNameGroup = new Group()
      this.badgeGroup = new Group()
      this.label3d = new Label3d(this)
      this.mainSceneGroup.rotateX(-Math.PI / 2)

      this.mainSceneGroup.add(this.labelGroup, this.gqGroup, this.provinceNameGroup, this.badgeGroup)
      this.sceneGroup.add(this.mainSceneGroup, this.childSceneGroup)
      this.scene.add(this.sceneGroup)
      // 添加事件
      this.addEvent()
      // 创建柱状图
      this.createBar()
      // 创建飞线
      this.createFlyLine()
      // 创建时间线
      let tl = gsap.timeline()
      // 相机动画
      tl.addLabel("focusMap", 3.5)
      tl.addLabel("focusMapOpacity", 4.0)
      tl.addLabel("bar", 5.0)
      tl.add(
        gsap.to(this.camera.instance.position, {
          duration: 2.5,
          delay: 2,
          x: 3.134497983573052,
          y: 126.8312346165316,
          z: 78.77649752477839,
          ease: "circ.out",
          onComplete: () => {
            this.camera.controls.saveState()
          },
        })
      )


      this.allProvinceLabel.map((item, index) => {
        let element = item.element.querySelector(".provinces-label-style02-wrap")
        let number = item.element.querySelector(".number .value")
        let numberVal = Number(number.innerText)
        let numberAnimate = {
          score: 0,
        }
        tl.add(
          gsap.to(element, {
            duration: 0.5,
            delay: 0.05 * index,
            translateY: 0,
            opacity: 1,
            ease: "circ.out",
          }),
          "bar"
        )
        let text = gsap.to(numberAnimate, {
          duration: 0.5,
          delay: 0.05 * index,
          score: numberVal,
          onUpdate: showScore,
        })
        function showScore() {
          number.innerText = numberAnimate.score.toFixed(0)
        }
        tl.add(text, "bar")
      })
      this.allProvinceNameLabel.map((item, index) => {
        let element = item.element.querySelector(".provinces-name-label-wrap")

        tl.add(
          gsap.to(element, {
            duration: 0.5,
            delay: 0.05 * index,
            translateY: 0,
            opacity: 1,
            ease: "circ.out",
          }),
          "bar"
        )
      })
    })
  }
  /**
   * 设置光圈移动
   * @param {*} name
   * @param {*} type up-上移  down-下移
   */
  setGQMove(adcode, type = "up") {
    if (this.flyLineFocusGroup.userData.adcode === adcode) {
      console.log(this.flyLineFocusGroup.userData.adcode)
      gsap.to(this.flyLineFocusGroup.position, {
        duration: 0.3,
        y:
          type === "up"
            ? this.flyLineFocusGroup.userData.position[1] + this.depth / 2 + 0.3
            : this.flyLineFocusGroup.userData.position[1],
      })
    }
  }


  // 创建飞线
  createFlyLine() {
    // 贴图
    const texture = this.assets.instance.getResource("flyLine")
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.generateMipmaps = false
    texture.magFilter = NearestFilter
    texture.repeat.set(0.5, 1)
    // 飞线
    let flyLine = new FlyLine(this, {
      centerPoint: this.flyLineCenter,
      data: provincesData,
      texture: texture,
      material: new MeshBasicMaterial({
        map: texture,
        alphaMap: texture,
        color: 0xfbdf88,
        transparent: true,
        fog: false,
        depthTest: false,
        blending: AdditiveBlending,
      }),
    })
    flyLine.setParent(this.mainSceneGroup)
    flyLine.visible = false
    flyLine.instance.position.z = this.depth + 0.4

    this.flyLineGroup = flyLine

    this.createFlyLineFocus()
  }
  createFlyLineFocus() {
    this.flyLineFocusGroup = new Group()
    this.flyLineFocusGroup.visible = false

    let [x, y] = this.geoProjection(this.flyLineCenter)
    this.flyLineFocusGroup.position.set(x, -y, this.depth + 0.47)
    this.flyLineFocusGroup.userData.name = "北京市" // 设置光圈的名字
    this.flyLineFocusGroup.userData.adcode = 110000 //设置光圈的adcode
    this.flyLineFocusGroup.userData.position = [x, -y, this.depth + 0.47] //设置光圈的位置
    this.mainSceneGroup.add(this.flyLineFocusGroup)
    const flyLineFocus = this.assets.instance.getResource("guangquan1")
    const geometry = new PlaneGeometry(5, 5)
    const material = new MeshBasicMaterial({
      color: 0xfbdf88,
      map: flyLineFocus,
      alphaMap: flyLineFocus,
      transparent: true,
      fog: false,
      depthTest: false,
      blending: AdditiveBlending,
    })
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 30
    mesh.scale.set(0, 0, 0)
    const mesh2 = mesh.clone()
    mesh2.material = material.clone()
    this.flyLineFocusGroup.add(mesh, mesh2)
    gsap.to(mesh.material, {
      opacity: 0,
      repeat: -1,
      yoyo: false,
      duration: 1,
    })
    gsap.to(mesh.scale, {
      x: 2,
      y: 2,
      z: 2,
      repeat: -1,
      yoyo: false,
      duration: 1,
    })
    gsap.to(mesh2.material, {
      delay: 0.5,
      opacity: 0,
      repeat: -1,
      yoyo: false,
      duration: 1,
    })
    gsap.to(mesh2.scale, {
      delay: 0.5,
      x: 2,
      y: 2,
      z: 2,
      repeat: -1,
      yoyo: false,
      duration: 1,
    })
  }


  // 更新
  update() {
    super.update()
    this.stats && this.stats.update()
    this.interactionManager && this.interactionManager.update()
  }
  // 销毁
  destroy() {
    super.destroy()
    this.label3d && this.label3d.destroy()
    this.stats && this.stats.dom && document.body.removeChild(this.stats.dom)
    this.groundMirror && this.groundMirror.dispose()
    this.toastLoading && this.toastLoading.destroy()
    this.childMap && this.childMap.destroy()
  }
}
