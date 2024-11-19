<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-01 16:43:13
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-19 11:31:44
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import bar_up from '@/pages/index/assets/json/lottie/bar_up.json?raw'
import { use, type ComposeOption, graphic } from 'echarts/core'
import VChart from 'vue-echarts'
import { GridComponent, type GridComponentOption } from 'echarts/components'
import {
  BarChart,
  EffectScatterChart,
  CustomChart,
  type CustomSeriesOption,
  type EffectScatterSeriesOption,
  type BarSeriesOption,
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'
import { formatNumber } from '@/utils/format'

use([GridComponent, BarChart, CustomChart, CanvasRenderer, EffectScatterChart])

const shareData: Record<string, any> = inject('shareData')!

const data = computed(() => {
  const arr = (shareData.mainData.assetSumList ?? [])
    .map((item: any) => {
      return {
        name: item.bizYear,
        value: item.orgTotalAmt,
      }
    })
    .sort((a: any, b: any) => {
      return dayjs(a.name).isBefore(dayjs(b.name)) ? -1 : 1
    })
    .slice(-7)
  let total = 0
  return arr.map((item: any) => {
    return {
      name: item.name,
      value: (total += item.value),
    }
  })
})

const vChartRef = ref<InstanceType<typeof VChart> | null>(null)
const maxValue = ref(0)

function rendered() {
  const chart = vChartRef.value!.chart!
  // @ts-expect-error https://github.com/apache/echarts/issues/18302
  const yAxis = chart.getModel().getComponent('yAxis')
  maxValue.value = yAxis.axis.scale.getExtent()[1]
}

watchEffect(() => {
  const downDistance = useDynamicPx(5).value
  // 绘制顶面
  const CubeTop = graphic.extendShape({
    buildPath(ctx, shape) {
      const c0 = [shape.x, shape.y + downDistance] // 下
      const c1 = [shape.x + useDynamicPx(10).value, shape.y - useDynamicPx(5).value + downDistance] // 右
      const c2 = [shape.x, shape.y - useDynamicPx(10).value + downDistance] // 上
      const c3 = [shape.x - useDynamicPx(10).value, shape.y - useDynamicPx(5).value + downDistance] // 左
      ctx
        .moveTo(c0[0], c0[1])!
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath()
    },
    shape: {
      x: 0,
      y: 0,
    },
  })
  // 绘制左侧面
  const CubeLeft = graphic.extendShape({
    buildPath(ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y + downDistance] // 右上
      const c1 = [shape.x - useDynamicPx(10).value, shape.y - useDynamicPx(5).value + downDistance] // 左上
      const c2 = [
        xAxisPoint[0] - useDynamicPx(10).value,
        xAxisPoint[1] - useDynamicPx(5).value + downDistance,
      ] // 左下
      const c3 = [xAxisPoint[0], xAxisPoint[1] + downDistance] // 右下
      ctx
        .moveTo(c0[0], c0[1])!
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath()
    },
    shape: {
      x: 0,
      y: 0,
    },
  })
  // 绘制右侧面
  const CubeRight = graphic.extendShape({
    buildPath(ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y + downDistance] // 左上
      const c2 = [xAxisPoint[0], xAxisPoint[1] + downDistance] // 左下
      const c3 = [
        xAxisPoint[0] + useDynamicPx(10).value,
        xAxisPoint[1] - useDynamicPx(5).value + downDistance,
      ] // 右下
      const c4 = [shape.x + useDynamicPx(10).value, shape.y - useDynamicPx(5).value + downDistance] // 右上
      ctx
        .moveTo(c1[0], c1[1])!
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath()
    },
    shape: {
      x: 0,
      y: 0,
    },
  })
  // 注册三个面图形
  graphic.registerShape('CubeLeft', CubeLeft)
  graphic.registerShape('CubeRight', CubeRight)
  graphic.registerShape('CubeTop', CubeTop)
})

const option = computed<
  ComposeOption<
    BarSeriesOption | CustomSeriesOption | EffectScatterSeriesOption | GridComponentOption
  >
>(() => {
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
  const fontSize = useDynamicPx(chartFontSize).value
  const gridXGap = useDynamicPx(20).value
  return {
    grid: {
      bottom: gridXGap,
      containLabel: true,
      left: 0,
      right: useDynamicPx(10).value,
      top: fontSize * 1.5,
    },
    series: [
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
      // 背景
      {
        data: data.value.map(() => maxValue.value),
        renderItem(_, api) {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            children: [
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  y: location[1],
                },
                style: {
                  fill: '#1b83bb80',
                },
                type: 'CubeLeft',
              },
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  y: location[1],
                },
                style: {
                  fill: '#1b83bb60',
                },
                type: 'CubeRight',
              },
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  y: location[1],
                },
                style: {
                  fill: '#1779b5',
                },
                type: 'CubeTop',
              },
            ],
            type: 'group',
          }
        },
        type: 'custom',
      },
      {
        data: data.value.map((item: any) => item.value),
        renderItem: (_, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            children: [
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  xValue: api.value(0),
                  y: location[1],
                  yValue: api.value(1),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      color: '#5cc4eb',
                      offset: 0,
                    },
                    {
                      color: '#21658c',
                      offset: 0.8,
                    },
                  ]),
                },
                type: 'CubeLeft',
              },
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  xValue: api.value(0),
                  y: location[1],
                  yValue: api.value(1),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      color: '#048fd4',
                      offset: 0,
                    },
                    {
                      color: '#195684',
                      offset: 0.8,
                    },
                  ]),
                },
                type: 'CubeRight',
              },
              {
                shape: {
                  api,
                  x: location[0],
                  xAxisPoint: api.coord([api.value(0), 0]),
                  xValue: api.value(0),
                  y: location[1],
                  yValue: api.value(1),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      color: '#65c7ec',
                      offset: 0,
                    },
                    {
                      color: '#65c7ec',
                      offset: 1,
                    },
                  ]),
                },
                type: 'CubeTop',
              },
            ],
            type: 'group',
          }
        },
        type: 'custom',
      },
    ],
    xAxis: {
      axisLabel: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        formatter: (bizYear: number) => {
          return dayjs(bizYear).format('YY年')
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
      data: data.value.map((item: any) => item.name),
      offset: gridXGap,
    },
    yAxis: {
      axisLabel: {
        color: colors.white,
        fontFamily: chartFontFamily,
        fontSize,
        formatter: (value: number) => {
          return formatNumber(value, {
            notation: 'compact',
          })
        },
      },
      splitLine: {
        lineStyle: {
          color: colors.line,
        },
      },
    },
  } as ComposeOption<
    BarSeriesOption | CustomSeriesOption | EffectScatterSeriesOption | GridComponentOption
  >
})
</script>

<template>
  <div class="asset_trend_wrapper absolute flex flex-col">
    <ChartTitle :data="bar_up" title="资产规模"></ChartTitle>
    <VChart
      ref="vChartRef"
      :option="option"
      autoresize
      class="flex-auto"
      @rendered="rendered"
    ></VChart>
  </div>
</template>
