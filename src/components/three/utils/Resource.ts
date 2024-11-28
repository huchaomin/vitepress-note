/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 16:03:50
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 14:53:31
 * @Description  :
 */
import type * as THREE from 'three'
import type { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import EventEmitter from './EventEmitter'

type LoadersType = typeof GLTFLoader | typeof THREE.FileLoader | typeof THREE.TextureLoader

const ResourceType = {
  // CubeTextureLoader: 'CubeTexture',
  // FBXLoader: 'FBX',
  FileLoader: async () => import('three').then(({ FileLoader }) => FileLoader),
  // FontLoader: 'Font',
  GLTFLoader: async () =>
    import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => GLTFLoader),
  // ImageLoader: 'Image',
  // MaterialLoader: 'Material',
  // MMDLoader: 'MMD',
  // MTLLoader: 'MTL',
  // ObjectLoader: 'Object',
  // OBJLoader: 'OBJ',
  // PCDLoader: 'PCD',
  // RGBELoader: 'RGBELoader',
  TextureLoader: async () => import('three').then(({ TextureLoader }) => TextureLoader),
} as const

export interface AssetType {
  data?: Parameters<NonNullable<Parameters<InstanceType<LoadersType>['load']>[1]>>[0]
  name: string // 资源的name 不要重复哦
  path: string
  type: keyof typeof ResourceType
}

export default class Resource extends EventEmitter {
  private assets: AssetType[]
  private dracoPath: string
  private loaders: Record<keyof typeof ResourceType, InstanceType<LoadersType>>
  constructor(config: { dracoPath?: string } = {}) {
    super()
    // /examples/jsm/libs/draco/ 解析器地址一般要copy到项目中
    this.dracoPath = config.dracoPath ?? './draco/gltf/'
    // @ts-expect-error 这里类型不知道怎么写
    this.loaders = {}
    this.assets = []
  }

  async addLoader(
    loaderName: keyof typeof ResourceType,
  ): Promise<GLTFLoader | THREE.FileLoader | THREE.TextureLoader> {
    return new Promise((resolve, reject) => {
      if (this.loaders[loaderName] !== undefined) {
        resolve(this.loaders[loaderName])
        return
      }
      ResourceType[loaderName]()
        .then((constructor) => {
          const instance = new constructor()
          if (loaderName === 'GLTFLoader') {
            this.initDraco(instance as GLTFLoader)
              .then(() => {
                this.loaders[loaderName] = instance
                resolve(instance)
              })
              .catch(reject)
          } else {
            this.loaders[loaderName] = instance
            resolve(instance)
          }
        })
        .catch(reject)
    })
  }

  getResource(name: string) {
    const current = this.assets.find((item) => {
      return item.name === name
    })
    if (!current) {
      throw new Error(`资源${name}不存在`)
    }
    return current.data
  }

  async loadItem(item: AssetType): Promise<AssetType> {
    return new Promise((resolve, reject) => {
      const result = this.assets.find((asset) => asset.path === item.path)
      if (result !== undefined) {
        resolve(result)
        return
      }
      if (this.loaders[item.type] === undefined) {
        reject(`资源${item.path}没有配置加载器`)
        return
      }
      this.loaders[item.type].load(
        item.path,
        // success
        (data) => {
          const obj = { ...item, data }
          this.assets.push(obj)
          resolve(obj)
        },
        // progress
        undefined,
        // error
        (err) => {
          reject(err)
        },
      )
    })
  }

  async loadMultiple(assets: AssetType[]): Promise<AssetType[]> {
    return new Promise((resolve, reject) => {
      const promise: Promise<AssetType>[] = []
      assets.forEach((item) => {
        if (item.data === undefined) {
          promise.push(this.loadItem(item))
        } else {
          promise.push(Promise.resolve(item))
        }
      })
      Promise.all(promise)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  protected async initDraco(loader: GLTFLoader): Promise<void> {
    import('three/examples/jsm/loaders/DRACOLoader.js')
      .then(({ DRACOLoader }) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath(this.dracoPath)
        dracoLoader.preload()
        loader.setDRACOLoader(dracoLoader)
      })
      .catch(async (err) => {
        return Promise.reject(err)
      })
  }
}
