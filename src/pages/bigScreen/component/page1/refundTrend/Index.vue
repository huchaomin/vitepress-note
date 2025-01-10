<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-10 11:10:49
 * @Description  :
-->
<script setup lang="ts">
import bar3d from '@/pages/bigScreen/assets/img/bar_3d.png?url'
import line from '@/pages/bigScreen/assets/img/line.png?url'
import bar_chart from '@/pages/bigScreen/assets/json/lottie/bar_chart.json?raw'
import { chartFontFamily, chartFontSize, colors } from '@/pages/bigScreen/utils/others'
import {
  BarChart,
  type BarSeriesOption,
  EffectScatterChart,
  type EffectScatterSeriesOption,
  LineChart,
  type LineSeriesOption,
  PictorialBarChart,
  type PictorialBarSeriesOption,
} from 'echarts/charts'
import {
  GraphicComponent,
  type GraphicComponentOption,
  GridComponent,
  type GridComponentOption,
  LegendComponent,
  type LegendComponentOption,
} from 'echarts/components'
import { type ComposeOption, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import ChartTitle from '../ChartTitle.vue'

use([
  GridComponent,
  BarChart,
  EffectScatterChart,
  PictorialBarChart,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  GraphicComponent,
])

const shareData: Record<string, any> = inject('shareData')!

const data = computed(() => {
  return (shareData.mainData.repaySumList ?? [])
    .map((item: any) => {
      return {
        name: item.sort,
        repayAmt: item.repayAmt / 10000000,
        repayUserQty: item.repayUserQty / 10000,
      }
    })
    .sort((a: any, b: any) => {
      return b.name - a.name
    })
    .slice(-6)
})

const vChartRef = ref<InstanceType<typeof VChart> | null>(null)
const maxValue = ref(0)

// TODO 这个方法一直触发
function rendered() {
  const chart = vChartRef.value!.chart!
  // @ts-expect-error https://github.com/apache/echarts/issues/18302
  const yAxis = chart.getModel().getComponent('yAxis') // 获取 右边的y轴的话 ('yAxis'， 1)
  maxValue.value = yAxis.axis.scale.getExtent()[1]
}

const option = computed<
  ComposeOption<
    | BarSeriesOption
    | EffectScatterSeriesOption
    | GraphicComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
    | PictorialBarSeriesOption
  >
>(() => {
  const xAxisOffset = useDynamicPx(15).value
  const fontSize = useDynamicPx(chartFontSize).value
  const symbolSize = useDynamicPx(10).value
  const yAxisCommonConfig = {
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
  }
  const barWidth = useDynamicPx(18).value
  const bottomEffectScatterWidth = useDynamicPx(26).value
  const bottomEffectScatterHeight = useDynamicPx(10).value
  const color = {
    backgroundBar: 'rgba(1, 80, 207,  0.3)',
    backgroundHat: 'rgba(1, 80, 207, 0.6)',
    barBottom: colors.lineHover,
    barHat: 'rgba(14, 195, 255,  1)',
    barTop: colors.line,
    bottomEffectScatter: 'rgba(102, 155, 255, 0.8)',
  }
  return {
    graphic: {
      elements: [
        {
          left: 0,
          style: {
            fill: colors.white,
            fontFamily: chartFontFamily,
            fontSize,
            lineHeight: fontSize + useDynamicPx(3).value,
            text: '还款额(千万元)',
          },
          top: fontSize * 2.5,
          type: 'text',
        },
        {
          right: 0,
          style: {
            fill: colors.white,
            fontFamily: chartFontFamily,
            fontSize,
            lineHeight: fontSize + useDynamicPx(3).value,
            text: '还款人数(万个)',
            textAlign: 'right',
          },
          top: fontSize * 2.5,
          type: 'text',
        },
      ],
    },
    grid: {
      bottom: xAxisOffset,
      containLabel: true,
      left: 0,
      right: 0,
      top: fontSize * 5,
    },
    legend: {
      align: 'right',
      data: [
        {
          icon: `image://${bar3d}`,
          name: '还款额',
        },
        {
          icon: `image://${line}`,
          name: '还款人数',
        },
      ],
      itemHeight: (bottomEffectScatterWidth * 1.8 * 62) / 114,
      itemWidth: bottomEffectScatterWidth * 1.8,
      padding: 0,
      right: 0,
      textStyle: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        lineHeight: fontSize,
      },
      top: 0,
    },
    series: [
      {
        data: data.value.map((item: any) => item.repayUserQty),
        itemStyle: {
          color: colors.white,
        },
        lineStyle: {
          color: colors.lineHover,
        },
        name: '还款人数',
        symbol: 'circle',
        symbolSize,
        type: 'line',
        yAxisIndex: 1,
      },

      // '最底下的涟漪圆片',
      {
        data: data.value.map(() => ({
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
        data: data.value.map((item: any) => ({
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
          value: item.repayAmt,
        })),
        name: '还款额',
        type: 'bar',
        z: 2,
      },
      // 下半截stack 透明柱状图
      {
        barWidth,
        data: data.value.map((item: any) => item.repayAmt),
        itemStyle: {
          color: 'transparent',
        },
        stack: 'forStack',
        type: 'bar',
      },
      // 圆柱的顶部
      {
        data: data.value.map((item: any) => ({
          itemStyle: {
            color: color.barHat,
          },
          symbolPosition: 'end',
          value: item.repayAmt,
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
        data: data.value.map((item: any) => ({
          itemStyle: {
            color: color.backgroundBar,
          },
          value: maxValue.value - item.repayAmt,
        })),
        stack: 'forStack',
        type: 'bar',
        z: 1,
      },
      // 背景的顶部
      {
        data: data.value.map(() => ({
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
        formatter: (sort: number) => {
          return `近${sort * 3}月`
        },
        interval: 0,
      },
      axisLine: {
        lineStyle: {
          color: colors.line,
        },
      },
      axisTick: {
        show: false,
      },
      data: data.value.map((item: any) => item.name),
      offset: xAxisOffset,
    },
    yAxis: [
      {
        ...yAxisCommonConfig,
      },
      {
        ...yAxisCommonConfig,
        alignTicks: true,
      },
    ],
  }
})
</script>

<template>
  <div class="refund_trend_wrapper absolute flex flex-col">
    <ChartTitle :data="bar_chart" title="还款趋势"></ChartTitle>
    <VChart
      ref="vChartRef"
      :option="option"
      autoresize
      class="flex-auto"
      @rendered="rendered"
    ></VChart>
  </div>
</template>
