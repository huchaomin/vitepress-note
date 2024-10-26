<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-26 12:23:23
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-10-26 23:34:38
 * @Description  :
-->
<script setup lang="ts">
import lineDancing from '@/assets/svg/line_dancing.svg?raw'
import { colors } from '@/pages/index/utils/others.ts'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    duration?: number
    streamerColor?: string
    streamerLength?: number
    streamerWidth?: number
    trackColor?: string
    trackWidth?: number
  }>(),
  {
    duration: 6,
    streamerColor: colors.lineHover,
    streamerLength: 120,
    streamerWidth: 4,
    trackColor: colors.line,
    trackWidth: 2,
  },
)

const rootRef = ref<HTMLDivElement | null>(null)
const { height, width } = useElementSize(rootRef)

const perimeter = computed(() => {
  return 2 * (width.value + height.value)
})

const iconVW = ref(3)
const iconPX = useVwToPx(iconVW)

const path = computed(() => {
  const halfTrackWidth = props.trackWidth / 2
  const right = width.value - halfTrackWidth
  const bottom = height.value - halfTrackWidth
  return `
    M${halfTrackWidth + iconPX.value / 2}, ${halfTrackWidth}
    L${right}, ${halfTrackWidth}
    L${right}, ${bottom}
    L${halfTrackWidth}, ${bottom}
    L${halfTrackWidth}, ${halfTrackWidth + iconPX.value / 2}
  `
})

const str = computed(() => {
  return `
    <defs>
      <path
        id="border-box-8-path-1bef9b1434584c56a8bf2ed42cc79bce"
        d="${path.value}"
        fill="transparent"
      ></path>
      <radialGradient
        id="border-box-8-gradient-1bef9b1434584c56a8bf2ed42cc79bce"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
      </radialGradient>
      <mask id="border-box-8-mask-1bef9b1434584c56a8bf2ed42cc79bce">
        <circle
          cx="0"
          cy="0"
          r="${props.streamerLength}"
          fill="url(#border-box-8-gradient-1bef9b1434584c56a8bf2ed42cc79bce)"
        >
          <animateMotion
            dur="${props.duration}s"
            path="${path.value}""
            rotate="auto"
            repeatCount="indefinite"
          ></animateMotion>
        </circle>
      </mask>
    </defs>
    <use
      stroke-width="${props.trackWidth}"
      xlink:href="#border-box-8-path-1bef9b1434584c56a8bf2ed42cc79bce"
      stroke="${props.trackColor}"
    ></use>
    <use
      stroke-width="${props.streamerWidth}"
      xlink:href="#border-box-8-path-1bef9b1434584c56a8bf2ed42cc79bce"
      mask="url(#border-box-8-mask-1bef9b1434584c56a8bf2ed42cc79bce)"
      stroke="${props.streamerColor}"
    >
      <animate
        attributeName="stroke-dasharray"
        from="0, ${perimeter.value}"
        to="${perimeter.value}, 0"
        dur="${props.duration}s"
        repeatCount="indefinite"
      ></animate>
    </use>
  `
})

const iconStr = computed(() => {
  return lineDancing
    .replace('stroke: white;', `stroke: ${props.streamerColor};`)
    .replace('stroke-width: 2;', `stroke-width: ${props.trackWidth};`)
})
</script>

<template>
  <div ref="rootRef" class="relative h-full w-full">
    <svg
      class="absolute"
      :width="width"
      :height="height"
      style="pointer-events: none"
      v-html="str"
    />
    <div
      class="left_top_icon absolute"
      :style="`width: ${iconVW}vw; height: ${iconVW}vw`"
      v-html="iconStr"
    ></div>
    <div v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.left_top_icon {
  top: 0;
  left: 0;
  transform: translate(-40%, -40%);
}
</style>
