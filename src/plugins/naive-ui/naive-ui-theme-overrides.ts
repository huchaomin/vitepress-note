/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-09 22:55:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-24 23:17:59
 * @Description  :
 */
import type { GlobalThemeOverrides } from 'naive-ui'

function R(px: number) {
  return `${px / 14}rem`
}

function T(px: number) {
  return `${px / 16}vw`
}

export default {
  Button: {
    iconMarginLarge: T(6),
    iconMarginMedium: T(6),
    iconMarginSmall: T(6),
    iconMarginTiny: T(6),
    iconSizeLarge: T(20),
    iconSizeMedium: T(18),
    iconSizeSmall: T(18),
    iconSizeTiny: T(14),
    paddingLarge: `0 ${T(18)}`,
    paddingMedium: `0 ${T(14)}`,
    paddingRoundLarge: `0 ${T(22)}`,
    paddingRoundMedium: `0 ${T(18)}`,
    paddingRoundSmall: `0 ${T(14)}`,
    paddingRoundTiny: `0 ${T(10)}`,
    paddingSmall: `0 ${T(10)}`,
    paddingTiny: `0 ${T(6)}`,
  },
  common: {
    fontFamily: 'var(--default-font-family)',
    fontFamilyMono: 'var(--default-mono-font-family)',
    fontSize: R(14),
    fontSizeHuge: R(16),
    fontSizeLarge: R(15),
    fontSizeMedium: R(14),
    fontSizeMini: R(12),
    fontSizeSmall: R(14),
    fontSizeTiny: R(12),
    heightHuge: R(46),
    heightLarge: R(40),
    heightMedium: R(34),
    heightMini: R(16),
    heightSmall: R(28),
    heightTiny: R(22),
    infoColor: '#697FEDFF',
    infoColorHover: '#9AADFEFF',
    infoColorPressed: '#596CDBFF',
    infoColorSuppl: '#9AADFEFF',
    primaryColor: '#697FEDFF',
    primaryColorHover: '#9AADFEFF',
    primaryColorPressed: '#596CDBFF',
    primaryColorSuppl: '#9AADFEFF',
  },
  Tree: {
    nodeHeight: '40px', // 这个不能转换
    nodeWrapperPadding: '0 0',
  },
  Typography: {
    headerBarWidth1: T(4),
    headerBarWidth2: T(4),
    headerBarWidth3: T(3),
    headerBarWidth4: T(3),
    headerBarWidth5: T(3),
    headerBarWidth6: T(3),
    headerFontSize1: R(30),
    headerFontSize2: R(22),
    headerFontSize3: R(18),
    headerFontSize4: R(16),
    headerFontSize5: R(16),
    headerFontSize6: R(16),
    headerMargin1: `${T(28)} 0 ${T(20)} 0`,
    headerMargin2: `${T(28)} 0 ${T(20)} 0`,
    headerMargin3: `${T(28)} 0 ${T(20)} 0`,
    headerMargin4: `${T(28)} 0 ${T(18)} 0`,
    headerMargin5: `${T(28)} 0 ${T(18)} 0`,
    headerMargin6: `${T(28)} 0 ${T(18)} 0`,
    headerPrefixWidth1: T(16),
    headerPrefixWidth2: T(16),
    headerPrefixWidth3: T(12),
    headerPrefixWidth4: T(12),
    headerPrefixWidth5: T(12),
    headerPrefixWidth6: T(12),
    pMargin: `${T(16)} 0 ${T(16)} 0`,
  },
} satisfies GlobalThemeOverrides
