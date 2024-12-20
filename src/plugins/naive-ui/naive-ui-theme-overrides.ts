/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-09 22:55:56
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-12-06 11:19:07
 * @Description  :
 */
import type { GlobalThemeOverrides } from 'naive-ui'

// function P(px: number) {
//   return `${px / 16}vw`
// }

function R(px: number) {
  return `${px / 15.2}rem`
}

export default {
  Anchor: {
    linkPadding: '4px 0 4px 12px',
  },
  // Button: {
  //   iconMarginLarge: P(6),
  //   iconMarginMedium: P(6),
  //   iconMarginSmall: P(6),
  //   iconMarginTiny: P(6),
  //   iconSizeLarge: P(20),
  //   iconSizeMedium: P(18),
  //   iconSizeSmall: P(18),
  //   iconSizeTiny: P(14),
  //   paddingLarge: `0 ${P(18)}`,
  //   paddingMedium: `0 ${P(14)}`,
  //   paddingRoundLarge: `0 ${P(22)}`,
  //   paddingRoundMedium: `0 ${P(18)}`,
  //   paddingRoundSmall: `0 ${P(14)}`,
  //   paddingRoundTiny: `0 ${P(10)}`,
  //   paddingSmall: `0 ${P(10)}`,
  //   paddingTiny: `0 ${P(6)}`,
  // },
  // Card: {
  //   closeIconSize: R(18),
  //   closeSize: R(22),
  //   paddingHuge: `${P(27)} ${P(40)} ${P(28)}`,
  //   paddingLarge: `${P(23)} ${P(32)} ${P(24)}`,
  //   paddingMedium: `${P(19)} ${P(24)} ${P(20)}`,
  //   paddingSmall: `${P(12)} ${P(16)} ${P(12)}`,
  //   titleFontSizeHuge: R(18),
  //   titleFontSizeLarge: R(18),
  //   titleFontSizeMedium: R(18),
  //   titleFontSizeSmall: R(16),
  // },
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
    // heightHuge: R(46),
    // heightLarge: R(40),
    // heightMedium: R(34),
    // heightMini: R(16),
    // heightSmall: R(28),
    // heightTiny: R(22),
    infoColor: '#697FEDFF',
    infoColorHover: '#9AADFEFF',
    infoColorPressed: '#596CDBFF',
    infoColorSuppl: '#9AADFEFF',
    primaryColor: '#697FEDFF',
    primaryColorHover: '#9AADFEFF',
    primaryColorPressed: '#596CDBFF',
    primaryColorSuppl: '#9AADFEFF',
  },
  // Scrollbar: {
  //   borderRadius: '5px', // 这个不能转换
  //   height: '5px',
  //   width: '5px',
  // },
  // Table: {
  //   tdPaddingLarge: P(12),
  //   tdPaddingMedium: P(12),
  //   tdPaddingSmall: P(6),
  //   thPaddingLarge: P(12),
  //   thPaddingMedium: P(12),
  //   thPaddingSmall: P(6),
  // },
  // Tooltip: {
  //   padding: `${P(8)} ${P(14)}`,
  // },
  Tree: {
    nodeHeight: '40px', // 这个不能转换
    nodeWrapperPadding: '0 0',
  },
  // Typography: {
  //   headerBarWidth1: P(4),
  //   headerBarWidth2: P(4),
  //   headerBarWidth3: P(3),
  //   headerBarWidth4: P(3),
  //   headerBarWidth5: P(3),
  //   headerBarWidth6: P(3),
  //   headerFontSize1: R(30),
  //   headerFontSize2: R(22),
  //   headerFontSize3: R(18),
  //   headerFontSize4: R(16),
  //   headerFontSize5: R(16),
  //   headerFontSize6: R(16),
  //   headerMargin1: `${P(28)} 0 ${P(20)} 0`,
  //   headerMargin2: `${P(28)} 0 ${P(20)} 0`,
  //   headerMargin3: `${P(28)} 0 ${P(20)} 0`,
  //   headerMargin4: `${P(28)} 0 ${P(18)} 0`,
  //   headerMargin5: `${P(28)} 0 ${P(18)} 0`,
  //   headerMargin6: `${P(28)} 0 ${P(18)} 0`,
  //   headerPrefixWidth1: P(16),
  //   headerPrefixWidth2: P(16),
  //   headerPrefixWidth3: P(12),
  //   headerPrefixWidth4: P(12),
  //   headerPrefixWidth5: P(12),
  //   headerPrefixWidth6: P(12),
  //   pMargin: `${P(16)} 0 ${P(16)} 0`,
  // },
} satisfies GlobalThemeOverrides
