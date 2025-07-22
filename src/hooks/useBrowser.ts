/*
 * @Author       : peter
 * @Date         : 2024-10-15 18:12:16
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-24 14:42:35
 * @Description  :
 */
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('sm')

const isTablet = breakpoints.between('sm', 'lg')

export { breakpointsTailwind, isMobile, isTablet }
