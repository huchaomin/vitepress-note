<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-12 10:57:11
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import line_chart from '@/pages/index/assets/json/lottie/line_chart.json?url'
import { use, type ComposeOption, graphic } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  type GridComponentOption,
} from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'

use([GridComponent, LegendComponent, LineChart, CanvasRenderer])

const data = [
  {
    name: '4月',
    value: 1000,
    value2: 800,
  },
  {
    name: '5月',
    value: 2000,
    value2: 1800,
  },
  {
    name: '6月',
    value: 3000,
    value2: 8800,
  },
  {
    name: '7月',
    value: 4000,
    value2: 10000,
  },
  {
    name: '8月',
    value: 5000,
    value2: 13000,
  },
  {
    name: '9月',
    value: 5000,
    value2: 13000,
  },
]

const option = computed<
  ComposeOption<GridComponentOption | LegendComponentOption | LineSeriesOption>
>(() => {
  const xAxisOffset = useDynamicPx(15).value
  const fontSize = useDynamicPx(chartFontSize).value
  const symbolSize = useDynamicPx(10).value
  return {
    grid: {
      bottom: xAxisOffset,
      containLabel: true,
      left: useDynamicPx(4).value,
      right: 0,
      top: fontSize * 2,
    },
    legend: {
      padding: 0,
      right: 0,
      textStyle: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        lineHeight: fontSize + 1,
      },
      top: 0,
    },
    series: [
      {
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              color: colors.blueHover,
              offset: 0,
            },
            {
              color: 'transparent',
              offset: 1,
            },
          ]),
        },
        data: data.map((item) => item.value),
        lineStyle: {
          color: colors.blueHover,
        },
        name: '法诉回款',
        symbol: 'circle',
        symbolSize,
        type: 'line',
      },
      {
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              color: colors.lineHover,
              offset: 0,
            },
            {
              color: 'transparent',
              offset: 1,
            },
          ]),
        },
        data: data.map((item) => item.value2),
        lineStyle: {
          color: colors.lineHover,
        },
        name: '调解回款',
        symbol: 'circle',
        symbolSize,
        type: 'line',
      },
    ],
    xAxis: {
      axisLabel: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
      },
      axisLine: {
        lineStyle: {
          color: colors.line,
        },
      },
      axisTick: {
        show: false,
      },
      data: data.map((item) => item.name),
      offset: xAxisOffset,
    },
    yAxis: {
      axisLabel: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
      },
      splitLine: {
        lineStyle: {
          color: colors.line,
        },
      },
    },
  }
})
</script>

<template>
  <div class="refund_trend_wrapper absolute flex flex-col">
    <ChartTitle :src="line_chart" title="回款趋势"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>

<style scoped>
.refund_trend_wrapper {
  height: 18vw;
}
</style>
