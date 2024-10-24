/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:43:47
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-24 16:13:51
 * @Description  :
 */
import {
  Color,
  Shape,
  RepeatWrapping,
  LineBasicMaterial,
  MeshStandardMaterial,
  DoubleSide,
  Group,
  Mesh,
  Vector3,
  ExtrudeGeometry,
  BufferGeometry,
  LineLoop,
} from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'
import { transformMapGeoJSON, getBoundBox, calcUv2 } from '@/components/three/utils/index'
import { geoMercator } from 'd3-geo'

function createProvinceMaterial(_this: CanvasRenderType) {
  const topNormal = _this.getAssetsData('topNormal') as THREE.Texture
  topNormal.wrapS = topNormal.wrapT = RepeatWrapping
  const topMaterial = new MeshStandardMaterial({
    color: 0x061e47,
    emissive: 0x000000,
    map: topNormal,
    normalMap: topNormal,
    opacity: 0,
    transparent: true,
  })

  const sideMap = _this.getAssetsData('side') as THREE.Texture
  sideMap.wrapS = RepeatWrapping
  sideMap.wrapT = RepeatWrapping
  sideMap.repeat.set(1, 0.2)
  sideMap.offset.y += 0.01
  const sideMaterial = new MeshStandardMaterial({
    // color: 0x62c3d1,
    color: 0xffffff,
    fog: false,
    map: sideMap,
    opacity: 0,
    side: DoubleSide,
    transparent: true,
  })

  sideMaterial.onBeforeCompile = (shader) => {
    shader.uniforms = {
      ...shader.uniforms,
      uColor1: { value: new Color(0x30b3ff) },
      uColor2: { value: new Color(0x30b3ff) },
    }
    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      `
      attribute float alpha;
      varying vec3 vPosition;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        vPosition = position;
    `,
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      `
      varying vec3 vPosition;
      varying float vAlpha;
      uniform vec3 uColor1;
      uniform vec3 uColor2;

      void main() {
    `,
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      /* glsl */ `
    #ifdef OPAQUE
    diffuseColor.a = 1.0;
    #endif

    // https://github.com/mrdoob/three.js/pull/22425
    #ifdef USE_TRANSMISSION
    diffuseColor.a *= transmissionAlpha + 0.1;
    #endif
    vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2);

    outgoingLight = outgoingLight*gradient;


    gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
    `,
    )
  }
  return [topMaterial, sideMaterial]
}

function createProvinceGroup(_this: CanvasRenderType) {
  const mainGroup = new Group()
  mainGroup.position.set(0, 0, 0.06)
  const mapData = transformMapGeoJSON(_this.getAssetsData('china') as string)
  const coordinates = []
  const linesGroup = new Group()
  mapData.features.forEach((feature, featureIndex) => {
    const { adcode, center, centroid, childrenNum, name } = feature.properties
    coordinates.push({
      adcode,
      center,
      centroid: centroid ?? center,
      enName: '',
      name,
      value: 0,
    })
    const group = new Group()
    group.name = `meshGroup${featureIndex}`
    group.userData = {
      adcode,
      center,
      centroid: centroid ?? center,
      childrenNum,
      index: featureIndex,
      // 存材质的默认发光颜色
      materialEmissiveHex: _this.focusMapTopMaterial.emissive.getHex(),
      name,
    }

    // 线组
    const lineGroup = new Group()
    lineGroup.name = `lineGroup${featureIndex}`
    lineGroup.userData = {
      adcode,
      index: featureIndex,
    }

    // 拉伸设置
    const extrudeSettings = {
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.1,
      depth: _this.depth,
    }
    const materials = [_this.focusMapTopMaterial.clone(), _this.focusMapSideMaterial]
    feature.geometry.coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        // 绘制shape
        const shape = new Shape()
        for (let i = 0; i < polygon.length; i++) {
          if (!polygon[i][0] || !polygon[i][1]) {
            return false
          }
          const [x, y] = geoMercator().center(_this.pointCenter).scale(120).translate([0, 0])(
            polygon[i],
          )!
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
        }

        const geometry = new ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new Mesh(geometry, materials)
        mesh.userData = {
          adcode,
          depth: _this.depth,
          materialEmissiveHex: _this.focusMapTopMaterial.emissive.getHex(),
          name,
        }
        mesh.renderOrder = 9
        group.add(mesh)
      })
      const points: THREE.Vector3[] = []
      let line: null | THREE.LineLoop = null
      multiPolygon[0].forEach((item) => {
        const [x, y] = geoMercator().center(_this.pointCenter).scale(120).translate([0, 0])(item)!
        points.push(new Vector3(x, -y, 0))
        const geometry = new BufferGeometry()
        geometry.setFromPoints(points)
        line = new LineLoop(geometry, _this.provinceLineMaterial)
        line.renderOrder = 2
        line.name = 'mapLine'
      })
      lineGroup.add(line!)
    })
    linesGroup.add(lineGroup)
    lineGroup.position.set(0, 0, _this.depth + 0.11)
    group.add(lineGroup)
    mainGroup.add(group)
  })
  return mainGroup
}

// 创建省份
function createProvince(_this: CanvasRenderType) {
  const topNormal = _this.getAssetsData('topNormal') as THREE.Texture

  topNormal.wrapS = topNormal.wrapT = RepeatWrapping

  _this.provinceLineMaterial = new LineBasicMaterial({
    color: 0x2bc4dc,
    fog: false,
    opacity: 0,
    transparent: true,
  })
  const [topMaterial, sideMaterial] = createProvinceMaterial(_this)

  _this.focusMapTopMaterial = topMaterial
  _this.focusMapSideMaterial = sideMaterial
  _this.time.on('tick', () => {
    sideMaterial.map!.offset.y += 0.002
  })
  const provinceGroup = createProvinceGroup(_this)
  const { box3, boxSize } = getBoundBox(provinceGroup)

  _this.eventElement = []
  provinceGroup.children.forEach((group) => {
    group.children.forEach((mesh) => {
      // TODO
      if (mesh.type === 'Mesh') {
        _this.eventElement.push(mesh)
        calcUv2(mesh.geometry, boxSize.x, boxSize.y, box3.min.x, box3.min.y)
      }
    })
  })
  return provinceGroup
}

export default (_this: CanvasRenderType) => {
  const group = createProvince(_this)
  group.position.set(0, 0.2, -5)
  group.scale.set(1, 1, 0)
  _this.mainSceneGroup.add(group)
  return group
}
