<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-18 17:10:41
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import bar_chart2 from '@/pages/index/assets/json/lottie/bar_chart2.json?raw'
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
import { formatNumber } from '@/utils/format'

use([GridComponent, LegendComponent, BarChart, CanvasRenderer])

const shareData: Record<string, any> = inject('shareData')!

const data = computed(() => {
  const { notThirdPartyAmt, notYinDengAmt, thirdPartyAmt, yinDengAmt } = shareData.mainData
  return [
    {
      name: '非银资产',
      value: notYinDengAmt,
    },
    {
      name: '银登资产',
      value: yinDengAmt,
    },
    {
      name: '运营资产',
      value: thirdPartyAmt,
    },
    {
      name: '自持资产',
      value: notThirdPartyAmt,
    },
  ]
})

const option = computed<
  ComposeOption<BarSeriesOption | GridComponentOption | LegendComponentOption>
>(() => {
  const barWidth = useDynamicPx(10).value
  const labelDistance = useDynamicPx(10).value
  const fontSize = useDynamicPx(chartFontSize).value
  return {
    grid: {
      bottom: 0,
      containLabel: true,
      left: labelDistance,
      top: fontSize * 1.5,
    },
    series: [
      {
        barWidth,
        data: data.value.map((item) => ({
          itemStyle: {
            borderRadius: [0, barWidth / 2, barWidth / 2, 0],
            color: new graphic.LinearGradient(
              1,
              0,
              0,
              0,
              [
                {
                  color: colors.lineHover,
                  offset: 0,
                },
                {
                  color: colors.line,
                  offset: 1,
                },
              ],
              false,
            ),
          },
          value: item.value,
        })),
        label: {
          color: colors.white,
          distance: labelDistance,
          fontFamily: chartFontFamily,
          fontSize,
          formatter: ({ value }) => {
            return formatNumber(value, {
              notation: 'compact',
            })
          },
          position: 'insideBottomLeft',
          show: true,
        },
        type: 'bar',
      },
    ],
    xAxis: {
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
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
      data: data.value.map((item) => item.name),
      inverse: true,
      offset: labelDistance,
    },
  }
})
</script>

<template>
  <div class="asset_distribution_wrapper absolute flex flex-col">
    <ChartTitle :data="bar_chart2" title="资产分布"></ChartTitle>
    <VChart :option="option" autoresize class="flex-auto"></VChart>
  </div>
</template>
