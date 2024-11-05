/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 15:33:40
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-05 15:43:55
 * @Description  :
 */
import numeral from 'numeral'

numeral.register('locale', 'chs', {
  abbreviations: {
    billion: '十亿',
    million: '百万',
    thousand: '千',
    trillion: '兆',
  },
  currency: {
    symbol: '¥',
  },
  delimiters: {
    decimal: '.',
    thousands: ',',
  },
  ordinal(_: number): string {
    return '.'
  },
})

numeral.locale('chs')

export default numeral
