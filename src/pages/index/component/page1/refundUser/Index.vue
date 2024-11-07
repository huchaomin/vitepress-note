<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 16:43:13
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-07 16:00:48
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import bar_chart from '@/pages/index/assets/json/lottie/bar_chart.json?url'
import { use, type ComposeOption } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  GridComponent,
  type GridComponentOption,
} from 'echarts/components'
import { BarChart, EffectScatterChart, PictorialBarChart, type EffectScatterSeriesOption, type PictorialBarSeriesOption, type BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'

use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  PictorialBarChart,
  EffectScatterChart,
])

const data = [
  {
    name: '2018年',
    value: 212,
  },
  {
    name: '2019年',
    value: 305,
  },
  {
    name: '2020年',
    value: 260,
  },
  {
    name: '2021年',
    value: 283,
  },
  {
    name: '2022年',
    value: 453,
  },
  {
    name: '2023年',
    value: 353,
  },
]

const vChartRef = ref<InstanceType<typeof VChart> | null>(null)
const maxValue = ref(0)

function rendered() {
  const chart = vChartRef.value!.chart!
  // @ts-expect-error https://github.com/apache/echarts/issues/18302
  const yAxis = chart.getModel().getComponent('yAxis')
  maxValue.value = yAxis.axis.scale.getExtent()[1]
}

const option = computed<ComposeOption<BarSeriesOption | EffectScatterSeriesOption | GridComponentOption | PictorialBarSeriesOption>>(() => {
  const barWidth = useDynamicPx(18).value
  const bottomEffectScatterWidth = useDynamicPx(26).value
  const bottomEffectScatterHeight = useDynamicPx(10).value
  const color = {
    backgroundBar: 'rgba(1, 80, 207,  0.3)',
    backgroundHat: 'rgba(1, 80, 207, 0.6)',
    barBottom: colors.blueHover,
    barHat: 'rgba(14, 195, 255,  1)',
    barTop: colors.blue,
    bottomEffectScatter: 'rgba(102, 155, 255, 1)',
  }
  const fontSize = useDynamicPx(chartFontSize).value
  const gridXGap = useDynamicPx(20).value
  return {
    grid: {
      bottom: gridXGap,
      containLabel: true,
      left: 0,
      right: 0,
      top: fontSize,
    },
    series: [
    // '最底下的涟漪圆片',
      {
        data: data.map(() => ({
          itemStyle: {
            color: color.bottomEffectScatter,
          },
          value: '0',
        })),
        symbolSize: [bottomEffectScatterWidth, bottomEffectScatterHeight], // 宽高
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
        z: 1,
      },
      // 下半截柱状图
      {
        barWidth,
        data: data.map((item) => ({
          itemStyle: {
            color: {
              colorStops: [
                {
                  color: color.barTop,
                  offset: 0,
                },
                {
                  color: color.barBottom,
                  offset: 1,
                },
              ],
              global: false,
              type: 'linear',
              x: 0,
              x2: 0,
              y: 0,
              y2: 1,
            },
          },
          value: item.value,
        })),
        type: 'bar',
        z: 2,
      },
      // 下半截stack 透明柱状图
      {
        barWidth,
        data: data.map((item) => item.value),
        itemStyle: {
          color: 'transparent',
        },
        stack: 'forStack',
        type: 'bar',
      },
      // 圆柱的顶部
      {
        data: data.map((item) => ({
          itemStyle: {
            color: color.barHat,
          },
          symbolPosition: 'end',
          value: item.value,
        })),
        symbolOffset: [0, -bottomEffectScatterHeight / 2],
        symbolSize: [barWidth, bottomEffectScatterHeight],
        type: 'pictorialBar',
        z: 3,
      },
      // 背景
      {
        barGap: '-100%',
        barWidth,
        data: data.map((item) => ({
          itemStyle: {
            color: color.backgroundBar,
          },
          value: maxValue.value - item.value,
        })),
        stack: 'forStack',
        type: 'bar',
        z: 1,
      },
      // 背景的顶部
      {
        data: data.map(() => ({
          itemStyle: {
            color: color.backgroundHat,
          },
          symbolPosition: 'end',
          value: maxValue.value,
        })),
        symbolOffset: [0, -bottomEffectScatterHeight / 2],
        symbolSize: [barWidth, bottomEffectScatterHeight],
        type: 'pictorialBar',
        z: 5,
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
      offset: gridXGap,
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
  <div class="refund_user_wrapper absolute flex flex-col">
    <ChartTitle :src="bar_chart" title="回款客户数据"></ChartTitle>
    <VChart ref="vChartRef" :option="option" autoresize class="flex-auto" @rendered="rendered"></VChart>
  </div>
</template>

<style scoped>
.refund_user_wrapper {
  height: 23vw;
}
</style>
