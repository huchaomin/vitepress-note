/*
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-15 18:12:16
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-10-16 11:13:10
 * @Description  :
 */
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('sm')

const isTablet = breakpoints.between('sm', 'md')

export { breakpointsTailwind, isMobile, isTablet }
