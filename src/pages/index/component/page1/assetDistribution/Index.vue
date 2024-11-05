<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-05 14:06:18
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../../ChartTitle.vue'
import bar_chart from '@/pages/index/assets/json/lottie/bar_chart.json?url'
import { use, type ComposeOption, graphic } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  type GridComponentOption,
} from 'echarts/components'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'

use([
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
])

const data = [
  {
    name: 'QD资产',
    value: 21,
    value2: 81,
  },
  {
    name: 'LX资产',
    value: 30,
    value2: 70,
  },
  {
    name: '信用卡',
    value: 26,
    value2: 46,
  },
  {
    name: '银登资产',
    value: 23,
    value2: 43,
  },
  {
    name: '其他资产',
    value: 13,
    value2: 73,
  },
]

const option = computed<ComposeOption<BarSeriesOption | GridComponentOption | LegendComponentOption >>(() => {
  const blueBarLeft = colors.blueHover
  const blueBarRight = colors.blue
  const barWidth = useDynamicPx(10).value
  const labelDistance = useDynamicPx(10).value
  const fontSize = useDynamicPx(chartFontSize).value
  return {
    grid: {
      bottom: 0,
      containLabel: true,
      left: labelDistance,
      top: fontSize * 2,
    },
    legend: {
      data: [
        {
          itemStyle: {
            color: blueBarLeft,
          },
          name: '法诉',
        },
        {
          itemStyle: {
            color: colors.lineHover,
          },
          name: '调解',
        },
      ],
      icon: 'roundRect',
      itemHeight: barWidth,
      itemWidth: barWidth * 2,
      padding: 0,
      right: 'left',
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
        barWidth,
        data: data.map((item) => ({
          itemStyle: {
            borderRadius: [barWidth / 2, 0, 0, barWidth / 2],
            color: new graphic.LinearGradient(1, 0, 0, 0, [{
              color: blueBarRight,
              offset: 0,
            }, {
              color: blueBarLeft,
              offset: 1,
            }], false),
          },
          value: item.value,
        })),
        label: {
          color: colors.white,
          distance: labelDistance,
          fontFamily: chartFontFamily,
          fontSize,
          position: 'insideBottom',
          show: true,
        },
        name: '法诉',
        stack: 'xxx',
        type: 'bar',
      },
      {
        barWidth,
        data: data.map((item) => ({
          itemStyle: {
            borderRadius: [0, barWidth / 2, barWidth / 2, 0],
            color: new graphic.LinearGradient(1, 0, 0, 0, [{
              color: colors.lineHover,
              offset: 0,
            }, {
              color: colors.line,
              offset: 1,
            }], false),
          },
          value: item.value2,
        })),
        label: {
          color: colors.white,
          distance: labelDistance,
          fontFamily: chartFontFamily,
          fontSize,
          position: 'insideBottom',
          show: true,
        },
        name: '调解',
        stack: 'xxx',
        type: 'bar',
      },
    ],
    xAxis: {
      axisLabel: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: colors.line,
        },
      },
    },
    yAxis: {
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
      inverse: true,
      offset: labelDistance,
    },
  }
})
</script>

<template>
  <div class="asset_distribution_wrapper absolute flex flex-col">
    <ChartTitle :src="bar_chart" title="当前资产分布"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>

<style scoped>
.asset_distribution_wrapper {
  top: 2vw;
  left: 2vw;
  width: 24vw;
  height: 18vw;
}
</style>
