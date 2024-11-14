<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 09:26:55
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-14 11:11:31
 * @Description  :
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    begin?: number
    color?: string
    dir?: [number, number]
    duration?: number
    height?: number
    length?: number
    path?: string
    strokeWidth?: number
    width?: number
  }>(),
  {
    begin: 0,
    color: '#0091FF',
    dir: () => [0, 1],
    duration: 3,
    height: 150,
    length: 100,
    path: 'M0 72.5H682L732 0.5H3082',
    strokeWidth: 4,
    width: 135,
  },
)

const maskId = computed(() => `svgLine-${useId()}`)
const radialGradientId = computed(() => `radialGradient-${useId()}`)
</script>

<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient :id="radialGradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" :stop-opacity="dir[1]" />
        <stop offset="100%" stop-color="#fff" :stop-opacity="dir[0]" />
      </radialGradient>
      <mask :id="maskId">
        <circle :r="length" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
          <animateMotion
            :begin="`${begin}s`"
            :dur="`${duration}s`"
            :path="path"
            rotate="auto"
            :keyPoints="`${dir[0]};${dir[1]}`"
            keyTimes="0;1"
            repeatCount="indefinite"
          />
        </circle>
      </mask>
    </defs>
    <path
      class="path_line"
      :d="path"
      :stroke="color"
      :stroke-width="strokeWidth"
      :mask="`url(#${maskId})`"
    />
  </svg>
</template>

<style>
.path_line {
  mix-blend-mode: screen;
}
</style>
