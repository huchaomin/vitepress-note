/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:43:47
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-22 11:50:17
 * @Description  :
 */
import {
  Color,
  RepeatWrapping,
  LineBasicMaterial,
  MeshStandardMaterial,
  DoubleSide,
  Group,
} from 'three'
import type * as THREE from 'three'

import type { CanvasRenderType } from '../index'

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

// 创建省份
function createProvince(_this: CanvasRenderType) {
  const mapJsonData = _this.getAssetsData('china')
  const topNormal = _this.getAssetsData('topNormal') as THREE.Texture

  topNormal.wrapS = topNormal.wrapT = RepeatWrapping

  _this.provinceLineMaterial = new LineBasicMaterial({
    color: 0x2bc4dc,
    fog: false,
    opacity: 0,
    transparent: true,
  })
  const [topMaterial, sideMaterial] = createProvinceMaterial(_this)

  _this.focusMapSideMaterial = sideMaterial
  const province = new ExtrudeMap(_this, {
    center: _this.pointCenter,
    data: mapJsonData,
    depth: _this.depth,
    lineMaterial: _this.provinceLineMaterial,
    position: new Vector3(0, 0, 0.06),
    renderOrder: 9,
    sideMaterial,
    topFaceMaterial: topMaterial,
  })
  _this.time.on('tick', () => {
    sideMaterial.map.offset.y += 0.002
  })
  const faceMaterial = new MeshStandardMaterial({
    color: 0x061e47,
    map: topNormal,
    normalMap: topNormal,
    opacity: 1,
    transparent: true,
  })

  const { box3, boxSize } = getBoundBox(province.mapGroup)

  _this.eventElement = []
  province.mapGroup.children.map((group, index) => {
    group.children.map((mesh) => {
      if (mesh.type === 'Mesh') {
        _this.eventElement.push(mesh)

        _this.calcUv2(mesh.geometry, boxSize.x, boxSize.y, box3.min.x, box3.min.y)
      }
    })
  })

  return {
    province,
  }
}

export default (_this: CanvasRenderType) => {
  const mapGroup = new Group()
  mapGroup.name = 'chinaMapGroup'
  const focusMapGroup = new Group()
  _this.focusMapGroup = focusMapGroup
  // 地图
  const { province } = createProvince(_this)
  _this.provinceMesh = province
  province.setParent(focusMapGroup)

  focusMapGroup.position.set(0, 0, -5)
  focusMapGroup.scale.set(1, 1, 0)

  mapGroup.add(focusMapGroup)
  mapGroup.position.set(0, 0.2, 0)
  _this.mainSceneGroup.add(mapGroup)
}
