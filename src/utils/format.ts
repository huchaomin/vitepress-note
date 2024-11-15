/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-05 16:54:50
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 14:32:07
 * @Description  :
 */
type FormatNumberConfig = {
  roundingMode?:
    | 'ceil'
    | 'expand'
    | 'floor'
    | 'halfCeil'
    | 'halfEven'
    | 'halfExpand'
    | 'halfFloor'
    | 'halfTrunc'
    | 'trunc'
} & ConstructorParameters<typeof Intl.NumberFormat>[1]

function formatNumber(n: any, config?: FormatNumberConfig): string {
  const number = Number(n)
  if (Number.isFinite(number) === false) {
    return ''
  }
  const obj: ConstructorParameters<typeof Intl.NumberFormat>[1] = {
    // compactDisplay: 'short', // 默认是 short 对中文来说没啥用
    currency: 'CNY', // https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=maintenance-agency
    maximumFractionDigits: 2, // 要使用的最小小数位数
    minimumFractionDigits: 2, // 要使用的最大小数位数
    notation: 'standard',
    // notation: 'compact', // 千 万 等等
    // numberingSystem: 'hans', // https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getNumberingSystems#supported_numbering_system_types
    style: 'decimal',
    // @ts-expect-error node 20 以上才有这个属性
    trailingZeroDisplay: 'stripIfInteger', // 如果所有小数位都为零，则删除小数位。如果任何小数位不为零 则 根据minimumFractionDigits和minimumSignificantDigits保留后缀零
    useGrouping: true, // 是否使用分组分隔符
    ...(config ?? {}),
  }
  return new Intl.NumberFormat(undefined, obj).format(number)
}
export { formatNumber }
