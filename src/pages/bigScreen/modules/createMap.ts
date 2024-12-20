/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 11:43:47
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 15:18:19
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

function createProvinceMaterial(_this: CanvasRenderType) {
  const topMap = _this.getAssetsData('mapTop') as THREE.Texture
  topMap.wrapS = topMap.wrapT = RepeatWrapping
  const topMaterial = new MeshStandardMaterial({
    color: 0x77c4bb,
    emissive: 0x000000,
    map: topMap,
    normalMap: topMap,
    opacity: 0,
    transparent: true,
  })

  const sideMap = _this.getAssetsData('mapSide') as THREE.Texture
  sideMap.wrapS = RepeatWrapping
  sideMap.wrapT = RepeatWrapping
  sideMap.repeat.set(1, 0.2)
  sideMap.offset.y += 0.01
  const sideMaterial = new MeshStandardMaterial({
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

function createProvinceGroup(
  _this: CanvasRenderType,
  topMaterial: THREE.MeshStandardMaterial,
  sideMaterial: THREE.MeshStandardMaterial,
  provinceLineMaterial: THREE.LineBasicMaterial,
) {
  const group = new Group()
  const mapData = transformMapGeoJSON(_this.getAssetsData('china') as string)
  mapData.features.forEach((feature) => {
    const { adcode, centroid, name } = feature.properties

    // shape 组
    const shapeGroup = new Group()
    shapeGroup.userData = {
      type: 'shape',
    }

    // 线组
    const lineGroup = new Group()
    lineGroup.userData = {
      type: 'line',
    }
    lineGroup.position.set(0, 0, _this.depth + 0.11)

    // 这里必须clone 要不然会共享同一个材质
    const materials = [topMaterial.clone(), sideMaterial]
    feature.geometry.coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        // 绘制shape
        const shape = new Shape()
        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = _this.geoProjection(polygon[i], true)!
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
        }

        const geometry = new ExtrudeGeometry(shape, {
          bevelEnabled: true,
          bevelSegments: 1,
          bevelThickness: 0.1,
          depth: _this.depth,
        })
        const mesh = new Mesh(geometry, materials)
        mesh.userData = {
          adcode,
          centroid,
          materialEmissiveHex: topMaterial.emissive.getHex(),
          name,
        }
        mesh.renderOrder = 9
        shapeGroup.add(mesh)
      })
      // 绘制省份边界线
      const points: THREE.Vector3[] = []
      let line: null | THREE.LineLoop = null
      multiPolygon[0].forEach((item) => {
        const [x, y] = _this.geoProjection(item, true)!
        points.push(new Vector3(x, -y, 0))
        const geometry = new BufferGeometry()
        geometry.setFromPoints(points)
        line = new LineLoop(geometry, provinceLineMaterial)
        line.renderOrder = 20
        line.name = 'mapLine'
      })
      lineGroup.add(line!)
    })
    const tempGroup = new Group()
    tempGroup.userData = {
      adcode,
      centroid,
      name,
    }
    tempGroup.add(shapeGroup, lineGroup)
    group.add(tempGroup)
  })
  return group
}

// 创建省份
export default (_this: CanvasRenderType) => {
  const topMap = _this.getAssetsData('mapTop') as THREE.Texture
  topMap.wrapS = topMap.wrapT = RepeatWrapping
  const provinceLineMaterial = new LineBasicMaterial({
    color: 0x2bc4dc,
    fog: false,
    opacity: 0,
    transparent: true,
  })
  const [topMaterial, sideMaterial] = createProvinceMaterial(_this)

  _this.time.on('tick', () => {
    sideMaterial.map!.offset.y += 0.002 // 材质有一个慢慢浸湿的效果
  })
  const group = createProvinceGroup(_this, topMaterial, sideMaterial, provinceLineMaterial)
  const { box3, boxSize } = getBoundBox(group)
  group.children.forEach((tempGroup) => {
    tempGroup.children.forEach((childGroup) => {
      if (childGroup.userData.type === 'shape') {
        childGroup.children.forEach((mesh) => {
          calcUv2((mesh as THREE.Mesh).geometry, boxSize.x, boxSize.y, box3.min.x, box3.min.y)
        })
      }
    })
  })
  _this.mapSceneGroup.add(group)
  return {
    group, // group -> tempGroup -> shapeGroup | lineGroup
    provinceLineMaterial,
    sideMaterial,
    topMaterial,
  }
}
