/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-11-09 22:55:56
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-01 13:03:56
 * @Description  :
 */
import type { GlobalThemeOverrides } from 'naive-ui'

function R(px: number) {
  return `${px / 15.2}rem`
}

export const common: GlobalThemeOverrides = {
  Anchor: {
    linkPadding: '4px 0 4px 12px',
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
}

export const dark: GlobalThemeOverrides = {
  Layout: {
    footerColor: 'rgb(16, 16, 20)',
    footerColorInverted: 'rgb(16, 16, 20)',
    headerColor: 'rgb(16, 16, 20)',
    headerColorInverted: 'rgb(16, 16, 20)',
    siderColor: 'rgb(16, 16, 20)',
    siderColorInverted: 'rgb(16, 16, 20)',
  },
}

export const light: GlobalThemeOverrides = {}
