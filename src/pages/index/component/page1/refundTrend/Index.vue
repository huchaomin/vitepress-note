<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-12 16:28:23
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import line_chart from '@/pages/index/assets/json/lottie/line_chart.json?raw'
import { use, type ComposeOption, graphic } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  GridComponent,
  LegendComponent,
  GraphicComponent,
  type LegendComponentOption,
  type GridComponentOption,
  type GraphicComponentOption,
} from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'
import dayjs from 'dayjs'

use([GridComponent, LegendComponent, LineChart, CanvasRenderer, GraphicComponent])

const shareData: Record<string, any> = inject('shareData')!

const data = computed(() => {
  return (shareData.mainData.repayMonthlyList ?? [])
    .map((item: any) => {
      return {
        fasuMonthRepayAmt: item.fasuMonthRepayAmt / 10000,
        name: item.yearMonths,
        tiaojieMonthRepayAmt: item.tiaojieMonthRepayAmt / 10000,
      }
    })
    .sort((a: any, b: any) => {
      return dayjs(a.yearMonths).isBefore(dayjs(b.yearMonths)) ? 1 : -1
    })
    .slice(-7)
})

const option = computed<
  ComposeOption<
    GraphicComponentOption | GridComponentOption | LegendComponentOption | LineSeriesOption
  >
>(() => {
  const xAxisOffset = useDynamicPx(15).value
  const fontSize = useDynamicPx(chartFontSize).value
  const symbolSize = useDynamicPx(10).value
  return {
    graphic: {
      elements: [
        {
          left: 'left',
          style: {
            fill: colors.white,
            fontFamily: chartFontFamily,
            fontSize,
            lineHeight: fontSize + useDynamicPx(3).value,
            text: '（万元）',
          },
          top: fontSize * 0.5,
          type: 'text',
        },
      ],
    },
    grid: {
      bottom: xAxisOffset,
      containLabel: true,
      left: useDynamicPx(4).value,
      right: useDynamicPx(32).value,
      top: fontSize * 3,
    },
    legend: {
      padding: 0,
      right: 0,
      textStyle: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        lineHeight: fontSize + useDynamicPx(3).value,
      },
      top: fontSize * 0.5,
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
        data: data.value.map((item: any) => item.fasuMonthRepayAmt),
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
        data: data.value.map((item: any) => item.tiaojieMonthRepayAmt),
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
        formatter: (yearMonths) => {
          return dayjs(yearMonths).format('YY年M月')
        },
      },
      axisLine: {
        lineStyle: {
          color: colors.line,
        },
      },
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      data: data.value.map((item: any) => item.name),
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
    <ChartTitle :data="line_chart" title="回款趋势"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>

<style scoped>
.refund_trend_wrapper {
  height: 18vw;
}
</style>
