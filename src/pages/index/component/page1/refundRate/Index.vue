<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-18 16:37:05
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
  return (shareData.mainData.bigScreenRepayRateList ?? [])
    .map((item: any) => {
      return {
        name: item.yearMonths,
        repayRate: item.repayRate * 100,
        targetRate: item.targetRate * 100,
      }
    })
    .sort((a: any, b: any) => {
      return dayjs(a.name).isBefore(dayjs(b.name)) ? -1 : 1
    })
    .slice(-24)
})

const option = computed<
  ComposeOption<
    GraphicComponentOption | GridComponentOption | LegendComponentOption | LineSeriesOption
  >
>(() => {
  const xAxisOffset = useDynamicPx(15).value
  const fontSize = useDynamicPx(chartFontSize).value
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
            text: '回收率（%）',
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
      right: 0,
      top: fontSize * 3,
    },
    legend: {
      align: 'right',
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
        data: data.value.map((item: any) => item.targetRate),
        lineStyle: {
          color: colors.blueHover,
          type: 'dashed',
        },
        name: '评估回收率',
        showSymbol: false,
        smooth: true,
        type: 'line',
        z: 1,
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
        data: data.value.map((item: any) => item.repayRate),
        lineStyle: {
          color: colors.lineHover,
        },
        name: '实际回收率',
        showSymbol: false,
        smooth: true,
        type: 'line',
        z: 2,
      },
    ],
    xAxis: {
      axisLabel: {
        alignMaxLabel: 'right',
        alignMinLabel: 'center',
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        formatter: (yearMonths) => {
          return dayjs(yearMonths).format('YY年M月')
        },
        showMaxLabel: true,
        showMinLabel: true,
      },
      axisLine: {
        show: false,
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
      scale: true, // 不包含 0
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
  <div class="refund_rate_wrapper absolute flex flex-col">
    <ChartTitle :data="line_chart" title="评估准确度"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>
