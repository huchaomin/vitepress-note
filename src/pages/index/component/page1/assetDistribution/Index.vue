<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-04 13:38:58
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
import { colors } from '@/pages/index/utils/others'

use([
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
])

const data = [
  {
    key: 'QD资产',
    value: 21,
    value2: 81,
  },
  {
    key: 'LX资产',
    value: 30,
    value2: 70,
  },
  {
    key: '信用卡',
    value: 26,
    value2: 46,
  },
  {
    key: '银登资产',
    value: 23,
    value2: 43,
  },
  {
    key: '其他资产',
    value: 13,
    value2: 73,
  },
]

const option = computed<ComposeOption<BarSeriesOption | GridComponentOption | LegendComponentOption >>(() => {
  const config = {
    barWidth: useDynamicPx(10).value,
    color: {
      barLeft: 'rgba(14, 195, 255, 0.8)',
      barRight: 'rgba(0, 72, 203, 0.8)',
    },
    fontSize: useDynamicPx(15).value,
    labelDistance: useDynamicPx(10).value,
  }
  return {
    grid: {
      bottom: 0,
      containLabel: true,
      left: config.labelDistance,
      top: config.fontSize * 3,
    },
    legend: {
      data: [
        {
          itemStyle: {
            color: config.color.barLeft,
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
      itemHeight: config.barWidth,
      itemWidth: config.barWidth * 2,
      right: 'left',
      textStyle: {
        color: colors.white,
        fontSize: config.fontSize,
      },
      top: 0,
    },
    series: [
      {
        barWidth: config.barWidth,
        data: data.map((item) => ({
          itemStyle: {
            borderRadius: [config.barWidth / 2, 0, 0, config.barWidth / 2],
            color: new graphic.LinearGradient(1, 0, 0, 0, [{
              color: config.color.barRight,
              offset: 0,
            }, {
              color: config.color.barLeft,
              offset: 1,
            }], false),
          },
          value: item.value,
        })),
        label: {
          color: colors.white,
          distance: config.labelDistance,
          fontSize: config.fontSize,
          position: 'insideBottom',
          show: true,
        },
        name: '法诉',
        stack: 'xxx',
        type: 'bar',
      },
      {
        barWidth: config.barWidth,
        data: data.map((item) => ({
          itemStyle: {
            borderRadius: [0, config.barWidth / 2, config.barWidth / 2, 0],
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
          distance: config.labelDistance,
          fontSize: config.fontSize,
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
        color: colors.white,
        fontSize: config.fontSize,
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
        fontSize: config.fontSize,
      },
      axisLine: {
        lineStyle: {
          color: colors.line,
        },
      },
      axisTick: {
        show: false,
      },
      data: data.map((item) => item.key),
      inverse: true,
      offset: config.labelDistance,
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
