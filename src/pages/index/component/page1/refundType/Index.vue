<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-13 09:25:27
 * @Description  :
-->
<script setup lang="ts">
import ChartTitle from '../ChartTitle.vue'
import pie_chart from '@/pages/index/assets/json/lottie/pie_chart.json?raw'
import { use, type ComposeOption } from 'echarts/core'
import VChart from 'vue-echarts'
import { GridComponent, type GridComponentOption } from 'echarts/components'
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors, chartFontFamily, chartFontSize } from '@/pages/index/utils/others'
import { formatNumber } from '@/utils/format'

const shareData: Record<string, any> = inject('shareData')!

const total = toRef(() => shareData.mainData.totalRepayAmt)

use([GridComponent, PieChart, CanvasRenderer])

const data = reactive([
  {
    name: '法诉回款',
    value: computed(() => shareData.mainData.fasuRepayAmt),
  },
  {
    name: '调解回款',
    value: computed(() => shareData.mainData.tiaojieRepayAmt),
  },
])

const colorList = [colors.blueHover, colors.lineHover]

const option = computed<ComposeOption<GridComponentOption | PieSeriesOption>>(() => {
  const fontSize = useDynamicPx(chartFontSize).value
  const itemColor = (params: any) => colorList[params.dataIndex]
  const wrapperItemStyle = {
    opacity: 0.2,
    shadowBlur: 20,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
  }
  const itemOthers = {
    center: ['50%', '50%'],
    padAngle: 5,
    startAngle: 90,
    type: 'pie',
  }
  return {
    grid: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
    series: [
      {
        data,
        itemStyle: {
          borderRadius: 5,
          color: itemColor,
          opacity: 0.8,
        },
        label: {
          color: colors.white,
          fontFamily: chartFontFamily,
          fontSize,
          formatter: ({ name, value }) => {
            return `{name|${name}}\n{value|${formatNumber(value, {
              notation: 'compact',
            })}}`
          },
          rich: {
            value: {
              fontFamily: chartFontFamily,
              fontSize: fontSize * 0.9,
              padding: [useDynamicPx(5).value, 0, 0, 0],
            },
          },
          show: true,
        },
        radius: ['58%', '78%'],
        ...itemOthers,
      },
      {
        data,
        itemStyle: {
          borderRadius: [5, 0],
          color: itemColor,
          ...wrapperItemStyle,
        },
        label: {
          show: false,
        },
        radius: ['52%', '59%'],
        ...itemOthers,
      },
      {
        data,
        itemStyle: {
          borderRadius: [0, 5],
          color: itemColor,
          ...wrapperItemStyle,
        },
        label: {
          show: false,
        },
        radius: ['77%', '84%'],
        ...itemOthers,
      },
    ],
  } as ComposeOption<GridComponentOption | PieSeriesOption>
})
</script>

<template>
  <div class="refund_type_wrapper absolute flex flex-col">
    <ChartTitle :data="pie_chart" title="回款方式"></ChartTitle>
    <div class="relative flex-auto">
      <VChart :option="option" autoresize></VChart>
      <div
        class="absolute flex h-full w-full flex-col items-center justify-center"
        style="top: 0; left: 0; z-index: -1;"
      >
        <span>累计回款金额</span>
        <span style="font-size: 2rem;">{{
          formatNumber(total, {
            notation: 'compact',
          })
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.refund_type_wrapper {
  top: 13vw;
  height: 18vw;
}
</style>
