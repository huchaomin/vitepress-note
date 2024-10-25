/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-21 16:02:20
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-25 14:56:00
 * @Description  :
 */
import Resource, { type AssetType } from '@/components/three/utils/Resource'
import side from '../assets/texture/side2.png'
import topNormal from '../assets/texture/top_surface_normal_map2.jpg'
import rotationBorder1 from '../assets/texture/rotationBorder1.png'
import rotationBorder2 from '../assets/texture/rotationBorder3.png'
import guangquan1 from '../assets/texture/guangquan01.png'
import guangquan2 from '../assets/texture/guangquan02.png'
import quan from '../assets/texture/quan.png'
import huiguang from '../assets/texture/huiguang.png'
import grid from '../assets/texture/grid.png'
import gridBlack from '../assets/texture/gridBlack.png'
import gaoguang1 from '../assets/texture/gaoguang1.png'
import flyLine from '../assets/texture/flyLine2.png'
import arrow from '../assets/texture/arrow.png'
import pathLine from '../assets/texture/pathLine2.png'
import pathLine2 from '../assets/texture/pathLine4.png'
import point from '../assets/texture/point1.png'

const BASE_URL = import.meta.env.VITE_BASE_URL
const assets: AssetType[] = [
  { name: 'grid', path: grid, type: 'TextureLoader' },
  { name: 'pathLine', path: pathLine2, type: 'TextureLoader' },
  { name: 'pathLine2', path: pathLine, type: 'TextureLoader' },
  { name: 'flyLine', path: flyLine, type: 'TextureLoader' },
  { name: 'arrow', path: arrow, type: 'TextureLoader' },
  { name: 'gridBlack', path: gridBlack, type: 'TextureLoader' },
  { name: 'quan', path: quan, type: 'TextureLoader' },
  { name: 'gaoguang1', path: gaoguang1, type: 'TextureLoader' },
  { name: 'huiguang', path: huiguang, type: 'TextureLoader' },
  { name: 'rotationBorder1', path: rotationBorder1, type: 'TextureLoader' },
  { name: 'rotationBorder2', path: rotationBorder2, type: 'TextureLoader' },
  { name: 'guangquan1', path: guangquan1, type: 'TextureLoader' },
  { name: 'guangquan2', path: guangquan2, type: 'TextureLoader' },
  { name: 'side', path: side, type: 'TextureLoader' },
  { name: 'topNormal', path: topNormal, type: 'TextureLoader' },
  { name: 'point', path: point, type: 'TextureLoader' },
  {
    name: 'chinaStorke',
    path: `${BASE_URL}assets/json/中华人民共和国-轮廓.json`,
    type: 'FileLoader',
  },
  {
    name: 'china',
    path: `${BASE_URL}assets/json/中华人民共和国.json`,
    type: 'FileLoader',
  },
  {
    name: 'province',
    path: `${BASE_URL}assets/json/中华人民共和国省份.json`,
    type: 'FileLoader',
  },
  {
    name: 'transportPath',
    path: `${BASE_URL}assets/json/运输路径.json`,
    type: 'FileLoader',
  },
]

export default async (): Promise<AssetType[]> => {
  const instance = new Resource()
  await instance.addLoader('FileLoader')
  await instance.addLoader('TextureLoader')
  return instance.loadMultiple(assets)
}
