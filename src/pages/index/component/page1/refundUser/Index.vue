<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 16:43:13
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2024-11-03 17:10:02
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../../ChartTitle.vue'
import bar_chart from '@/pages/index/assets/json/lottie/bar_chart.json?url'
import { use, type ComposeOption } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  GridComponent,
  type GridComponentOption,
} from 'echarts/components'
import { BarChart, EffectScatterChart, PictorialBarChart, type EffectScatterSeriesOption, type PictorialBarSeriesOption, type BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors } from '@/pages/index/utils/others'

use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  PictorialBarChart,
  EffectScatterChart,
])

const data = [
  {
    key: '2018年',
    value: 212,
  },
  {
    key: '2019年',
    value: 305,
  },
  {
    key: '2020年',
    value: 260,
  },
  {
    key: '2021年',
    value: 283,
  },
  {
    key: '2022年',
    value: 453,
  },
  {
    key: '2023年',
    value: 353,
  },
]

const option = computed<ComposeOption<BarSeriesOption | EffectScatterSeriesOption | GridComponentOption | PictorialBarSeriesOption>>(() => {
  const config = {
    barWidth: useDynamicPx(26).value,
    bottomEffectScatterHeight: useDynamicPx(12).value,
    color: {
      backgroundBar: 'rgba(1, 80, 207,  0.3)',
      backgroundHat: 'rgba(1, 80, 207, 0.6)',
      barBottom: 'rgba(0, 72, 203, 0.8)',
      barHat: 'rgba(14, 195, 255,  1)',
      barTop: 'rgba(14, 195, 255, 0.8)',
      bottomEffectScatter: 'rgba(102, 155, 255, 1)',
    },
    fontSize: useDynamicPx(16).value,
    gridXGap: useDynamicPx(20).value,
    maxValue: 500,
  }
  return {
    grid: {
      bottom: config.gridXGap,
      containLabel: true,
      left: 0,
      right: 0,
      top: config.gridXGap,
    },
    series: [
    // '最底下的涟漪圆片',
      {
        data: data.map(() => ({
          itemStyle: {
            color: config.color.bottomEffectScatter,
          },
          value: '0',
        })),
        symbolSize: [config.barWidth, config.bottomEffectScatterHeight], // 宽高
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
        z: 1,
      },
      // 下半截柱状图
      {
        barWidth: config.barWidth,
        data: data.map((item) => ({
          itemStyle: {
            color: {
              colorStops: [
                {
                  color: config.color.barBottom,
                  offset: 0,
                },
                {
                  color: config.color.barTop,
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
        barWidth: config.barWidth,
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
            color: config.color.barHat,
          },
          symbolPosition: 'end',
          value: item.value,
        })),
        symbolOffset: [0, -config.bottomEffectScatterHeight / 2],
        symbolSize: [config.barWidth, config.bottomEffectScatterHeight],
        type: 'pictorialBar',
        z: 3,
      },
      // 背景
      {
        barGap: '-100%',
        barWidth: config.barWidth,
        data: data.map((item) => ({
          itemStyle: {
            color: config.color.backgroundBar,
          },
          value: config.maxValue - item.value,
        })),
        stack: 'forStack',
        type: 'bar',
        z: 1,
      },
      // 背景的顶部
      {
        data: data.map(() => ({
          itemStyle: {
            color: config.color.backgroundHat,
          },
          symbolPosition: 'end',
          value: config.maxValue,
        })),
        symbolOffset: [0, -config.bottomEffectScatterHeight / 2],
        symbolSize: [config.barWidth, config.bottomEffectScatterHeight],
        type: 'pictorialBar',
        z: 5,
      },
    ],
    xAxis: {
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
      offset: config.gridXGap,
    },
    yAxis: {
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
  }
})

</script>

<template>
  <div class="refund_user_wrapper absolute flex flex-col">
    <ChartTitle :src="bar_chart" title="回款客户数据"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>

<style scoped>
.refund_user_wrapper {
  bottom: 2vw;
  left: 2vw;
  width: 26vw;
  height: 24vw;
}
</style>
