<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-10-26 12:23:23
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-01 16:40:06
 * @Description  :
-->
<script setup lang="ts">
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

const iconStr =
  `<defs>
    <clipPath id="svg-12-a-mask">
      <polygon
        class="svg-12-a-polygon"
        points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
      />
    </clipPath>
  </defs>
  <g class="svg-12-a-g" clip-path="url(#svg-12-a-mask)">
    <polygon
      class="svg-12-a-polygon svg-12-a-inner-polygon"
      points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
      style="animation-delay: -0s"
    />
    <polygon
      class="svg-12-a-polygon svg-12-a-inner-polygon"
      points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
      style="animation-delay: -2.5s"
    />
    <polygon
      class="svg-12-a-polygon svg-12-a-inner-polygon"
      points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
      style="animation-delay: -5s"
    />
    <polygon
      class="svg-12-a-polygon svg-12-a-inner-polygon"
      points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
      style="animation-delay: -7.5s"
    />
  </g>
  <polygon
    class="svg-12-a-polygon svg-12-a-outer-polygon"
    points="0,-30 21.21320343017578,-21.21320343017578 30,-1.8369703053475314e-15 21.21320343017578,21.21320343017578 3.673940610695063e-15,30 -21.21320343017578,21.21320343017578 -30,5.510910280767884e-15 -21.21320343017578,-21.21320343017578"
  />`
</script>

<template>
  <div ref="rootRef" class="relative h-full w-full">
    <svg
      class="absolute"
      :width="width"
      :height="height"
      style="pointer-events: none;"
      v-html="str"
    />
    <svg
      viewBox="-50 -50 100 100"
      class="left_top_icon absolute"
      :style="`width: ${iconVW}vw; height: ${iconVW}vw`"
      v-html="iconStr"
    />
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

<style>
/* stylelint-disable selector-class-pattern */
/* stylelint-disable number-max-precision */

.svg-12-a-polygon {
  fill: none;
  /* stylelint-disable-next-line value-keyword-case */
  stroke: v-bind(streamerColor);
  stroke-width: 2;
}

.svg-12-a-inner-polygon {
  /* stylelint-disable-next-line value-keyword-case */
  stroke-width: v-bind(trackWidth);
  animation: svg-12-a-moving-poly-anim 10s linear infinite;
}

@keyframes svg-12-a-moving-poly-anim {
  0% {
    transform: translate(0%, -15%);
  }

  12.5% {
    transform: translate(10.60660171508789%, -10.60660171508789%);
  }

  25% {
    transform: translate(15%, -9.184851526737656e-16%);
  }

  37.5% {
    transform: translate(10.60660171508789%, 10.60660171508789%);
  }

  50% {
    transform: translate(1.8369703053475315e-15%, 15%);
  }

  62.5% {
    transform: translate(-10.60660171508789%, 10.60660171508789%);
  }

  75% {
    transform: translate(-15%, 2.755455140383942e-15%);
  }

  87.5% {
    transform: translate(-10.60660171508789%, -10.60660171508789%);
  }

  100% {
    transform: translate(0%, -15%);
  }
}
  </style>
