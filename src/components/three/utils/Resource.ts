/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 16:03:50
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-21 18:05:57
 * @Description  :
 */
import { Loader, TextureLoader } from 'three'
import type * as THREE from 'three'
import EventEmitter from './EventEmitter'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

type LoadersType = typeof GLTFLoader | typeof TextureLoader | typeof THREE.FileLoader

const ResourceType: Record<string, string> = {
  CubeTextureLoader: 'CubeTexture',
  FBXLoader: 'FBX',
  FileLoader: 'File',
  FontLoader: 'Font',
  GLTFLoader: 'GLTF',
  ImageLoader: 'Image',
  MaterialLoader: 'Material',
  MMDLoader: 'MMD',
  MTLLoader: 'MTL',
  ObjectLoader: 'Object',
  OBJLoader: 'OBJ',
  PCDLoader: 'PCD',
  RGBELoader: 'RGBELoader',
  TextureLoader: 'Texture',
}
const types = Object.values(ResourceType)

export interface AssetType {
  data?: Parameters<NonNullable<Parameters<InstanceType<LoadersType>['load']>[1]>>[0]
  name: string
  path: string
  type: string
}

export default class Resource extends EventEmitter {
  assets: AssetType[]
  dracoPath: string
  loaders: Record<string, InstanceType<LoadersType>>
  constructor(config: { dracoPath?: string } = {}) {
    super()
    // /examples/jsm/libs/draco/ 解析器地址一般要copy到项目中
    this.dracoPath = config.dracoPath ?? './draco/gltf/'
    this.loaders = {}
    this.initDefaultLoader()
    this.assets = []
  }

  addLoader(LoaderConstructor: LoadersType, loaderName = '') {
    if (LoaderConstructor.name && ResourceType[loaderName]) {
      const hasLoader = this.loaders[loaderName] !== undefined
      if (!hasLoader) {
        const instance = new LoaderConstructor()
        const name = loaderName
        if (instance instanceof Loader) {
          if (name === 'GLTFLoader') {
            this.initDraco(instance as GLTFLoader)
          }
          this.loaders[ResourceType[name]] = instance
        } else {
          throw new TypeError('请配置正确的加载器')
        }
      }
    } else {
      throw new Error('请配置正确的加载器')
    }
  }

  destroy() {
    this.off('onProgress')
    this.off('onLoad')
    this.off('onError')
    this.assets = []
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

  /**
   * TODO 一定要吗 默认加载GLTFLoader, TextureLoader
   */
  initDefaultLoader() {
    ;[
      { loader: GLTFLoader, name: 'GLTFLoader' },
      { loader: TextureLoader, name: 'TextureLoader' },
    ].map((item) => this.addLoader(item.loader, item.name))
  }

  initDraco(loader: GLTFLoader) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(this.dracoPath)
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)
  }

  async loadAll(assets: AssetType[]): Promise<AssetType[]> {
    return new Promise((resolve, reject) => {
      const currentAssets = this.matchType(assets)
      const promise: Promise<AssetType>[] = []
      currentAssets.forEach((item) => {
        if (item.data === undefined) {
          promise.push(this.loadItem(item))
        } else {
          promise.push(Promise.resolve(item))
        }
      })
      Promise.all(promise)
        .then((res) => {
          res.forEach((item) => {
            const inAssetsItem = this.assets.find((asset) => asset.path === item.path)
            if (inAssetsItem) {
              inAssetsItem.data = item.data
            } else {
              this.assets.push(item)
            }
          })
          this.emit('onLoad')
          resolve(res)
        })
        .catch((err) => {
          this.emit('onError', err)
          reject(err)
        })
    })
  }

  async loadItem(item: AssetType): Promise<AssetType> {
    return new Promise((resolve, reject) => {
      if (this.loaders[item.type] === undefined) {
        reject(`资源${item.path}没有配置加载器`)
        return
      }
      this.loaders[item.type].load(
        item.path,
        // success
        (data) => {
          this.emit('onSuccess', item.path)
          resolve({ ...item, data })
        },
        // progress
        undefined,
        // error
        (err) => {
          this.emit('onError', err)
          reject(err)
        },
      )
    })
  }

  matchType(assets: AssetType[]): AssetType[] {
    return assets.map((item) => {
      const type = types.includes(item.type) ? item.type : ''
      if (type === '') {
        throw new Error(`资源${item.path},type不正确`)
      }
      return {
        ...item,
        type,
      }
    })
  }
}
