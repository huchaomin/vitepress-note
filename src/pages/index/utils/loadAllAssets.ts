/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 16:02:20
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-26 10:50:22
 * @Description  :
 */
import Resource, { type AssetType } from '@/components/three/utils/Resource'
import mapSide from '../assets/texture/map_side.png'
import mapTop from '../assets/texture/map_top.jpg'
import rotationBorder1 from '../assets/texture/rotation_border_1.png'
import rotationBorder2 from '../assets/texture/rotation_border_3.png'
import circle1 from '../assets/texture/circle_1.png'
import circle2 from '../assets/texture/circle_2.png'
import halo from '../assets/texture/halo.png'
import grid from '../assets/texture/grid.png'
import gridBlack from '../assets/texture/grid_black.png'
import bgLight from '../assets/texture/bg_light_1.png'
import strokeLine from '../assets/texture/stroke_line_1.png'

const BASE_URL = import.meta.env.VITE_BASE_URL
const assets: AssetType[] = [
  { name: 'grid', path: grid, type: 'TextureLoader' },
  { name: 'gridBlack', path: gridBlack, type: 'TextureLoader' },
  { name: 'halo', path: halo, type: 'TextureLoader' },
  { name: 'bgLight', path: bgLight, type: 'TextureLoader' },
  { name: 'rotationBorder1', path: rotationBorder1, type: 'TextureLoader' },
  { name: 'rotationBorder2', path: rotationBorder2, type: 'TextureLoader' },
  { name: 'circle1', path: circle1, type: 'TextureLoader' },
  { name: 'circle2', path: circle2, type: 'TextureLoader' },
  { name: 'mapSide', path: mapSide, type: 'TextureLoader' },
  { name: 'mapTop', path: mapTop, type: 'TextureLoader' },
  { name: 'strokeLine', path: strokeLine, type: 'TextureLoader' },
  {
    name: 'chinaStroke',
    path: `${BASE_URL}assets/json/中华人民共和国-轮廓.json`,
    type: 'FileLoader',
  },
  {
    name: 'china',
    path: `${BASE_URL}assets/json/中华人民共和国.json`,
    type: 'FileLoader',
  },
]

export default async (): Promise<AssetType[]> => {
  const instance = new Resource()
  await instance.addLoader('FileLoader')
  await instance.addLoader('TextureLoader')
  return instance.loadMultiple(assets)
}
