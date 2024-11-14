/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 22:53:12
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 16:32:04
 * @Description  :
 */
import type { EventBusKey } from '@vueuse/core'

export interface ItemType {
  clientName: string
  id: string
  registerProv: string
  repayAmt: number
  repayDate: string
}

const repayItemChangeKey: EventBusKey<{
  arr: ItemType[]
  index: number
}> = Symbol('repay_item_change_key')

const cameraPositionStartKey = Symbol('camera_position_start_key')
const cameraPositionReadyKey = Symbol('camera_position_ready_key')
const carouselIndexChangeKey: EventBusKey<number> = Symbol('carousel_index_change_key')

const colors = {
  blue: 'rgba(0, 72, 203, 0.8)',
  blueHover: 'rgba(14, 195, 255, 0.8)',
  line: '#0C4269',
  lineHover: '#00CED1',
  white: '#fff',
  yellow: '#ffe70b',
}

const chartFontFamily = 'JetBrainsMonoMedium, SmileySans-Oblique'

const chartFontSize = 16

export {
  cameraPositionReadyKey,
  cameraPositionStartKey,
  carouselIndexChangeKey,
  chartFontFamily,
  chartFontSize,
  colors,
  repayItemChangeKey,
}
