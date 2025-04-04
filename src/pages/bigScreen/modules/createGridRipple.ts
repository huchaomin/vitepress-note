/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-22 18:15:06
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-03 00:55:10
 * @Description  :
 */
import {
  PlaneGeometry,
  RepeatWrapping,
  MeshBasicMaterial,
  Mesh,
  AdditiveBlending,
  Color,
} from 'three'
import type * as THREE from 'three'
import type { CanvasRenderType } from '../index'

async function createDiffuseShader(
  _this: CanvasRenderType,
  material: MeshBasicMaterial,
): Promise<THREE.WebGLProgramParametersWithUniforms> {
  return new Promise((resolve) => {
    material.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        uColor: {
          value: new Color(0x079fe6),
        },
        uDir: {
          value: 2.0, // 1.0-xy,2.0-xz
        },
        uSpeed: {
          value: 30,
        },
        uTime: {
          value: 0.0,
        },
        uWidth: {
          value: 20,
        },
      }
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        /* glsl */ `
            varying vec3 vPosition;
            void main(){
              vPosition = position;
          `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        /* glsl */ `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uWidth;
            uniform vec3 uColor;
            uniform float uDir;
            varying vec3 vPosition;

            void main(){
          `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
            #ifdef OPAQUE
            diffuseColor.a = 1.0;
            #endif

            #ifdef USE_TRANSMISSION
            diffuseColor.a *= material.transmissionAlpha;
            #endif

            float r = uTime * uSpeed;
            //光环宽度
            float w = 0.0;
            if(w>uWidth){
              w = uWidth;
            }else{
              w = uTime * 5.0;
            }
            //几何中心点
            vec2 center = vec2(0.0, 0.0);
            // 距离圆心的距离

            float rDistance = distance(vPosition.xz, center);
            if(uDir==2.0){
              rDistance = distance(vPosition.xy, center);
            }
            if(rDistance > r && rDistance < r + 2.0 * w) {
              float per = 0.0;
              if(rDistance < r + w) {
                per = (rDistance - r) / w;
                outgoingLight = mix(outgoingLight, uColor, per);
                // 获取0->透明度的插值
                float alphaV = mix(0.0,diffuseColor.a,per);
                gl_FragColor = vec4(outgoingLight,  alphaV);
              } else {
                per = (rDistance - r - w) / w;
                outgoingLight = mix(uColor, outgoingLight, per);
                // 获取0->透明度的插值
                float alphaV = mix(diffuseColor.a,0.0,per);
                gl_FragColor = vec4(outgoingLight,  alphaV);
              }
            } else {
              gl_FragColor = vec4(outgoingLight, 0.0);
            }
          `,
      )
      resolve(shader)
    }
  })
}

export default (_this: CanvasRenderType) => {
  const geometry = new PlaneGeometry(500, 500)
  const texture = _this.getAssetsData('grid') as THREE.Texture
  const alphaMap = _this.getAssetsData('gridBlack') as THREE.Texture
  texture.wrapS = texture.wrapT = alphaMap.wrapS = alphaMap.wrapT = RepeatWrapping
  texture.repeat.set(40, 40)
  alphaMap.repeat.set(40, 40)
  const material = new MeshBasicMaterial({
    alphaMap,
    blending: AdditiveBlending,
    color: 0x00ffff,
    map: texture,
    opacity: 1,
    transparent: true,
  })
  const mesh = new Mesh(geometry, material)
  mesh.position.set(0, 0, 0.01)

  const mesh2 = mesh.clone()
  mesh2.material = material.clone()
  mesh2.material.opacity = 0.04
  _this.scene.add(mesh, mesh2)
  // 创建扩散效果 clone 的材质不会被下面影响
  void createDiffuseShader(_this, material).then((pointShader) => {
    _this.time.on('tick', (deltaTime) => {
      pointShader.uniforms.uTime.value += deltaTime
      const maxTime = 300 / 30 // size / diffuseSpeed;
      if (pointShader.uniforms.uTime.value > maxTime) {
        pointShader.uniforms.uTime.value = 0
      }
    })
  })
}
