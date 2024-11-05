<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-04 09:57:29
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-05 13:50:09
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
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { colors } from '@/pages/index/utils/others'

use([
  GridComponent,
  PieChart,
  CanvasRenderer,
])

const data = [
  {
    name: '法诉回款',
    value: 81,
  },
  {
    name: '调解回款',
    value: 30,
  },
]

const colorList = [colors.blueHover, colors.lineHover]

const option = computed<ComposeOption<GridComponentOption | PieSeriesOption >>(() => {
  const fontSize = useDynamicPx(15).value
  const itemColor = (params: any) => colorList[params.dataIndex]
  const wrapperItemStyle = {
    opacity: 0.2,
    shadowBlur: 20,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
  }
  const itemOthers = {
    center: ['50%', '50%'],
    padAngle: 5,
    startAngle: 300,
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
          fontSize,
          show: true,
        },
        radius: ['60%', '80%'],
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
        radius: ['54%', '61%'],
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
        radius: ['79%', '86%'],
        ...itemOthers,
      },
    ],
  } as ComposeOption<GridComponentOption | PieSeriesOption>
})
</script>

<template>
  <div class="asset_distribution_wrapper absolute flex flex-col">
    <ChartTitle :src="bar_chart" title="回款方式"></ChartTitle>
    <div class="flex-auto relative">
      <VChart :option="option" autoresize></VChart>
      <div class="absolute flex flex-col items-center justify-center w-full h-full" style=" top: 0; left: 0;z-index: -1;">
        <span>累计回款金额</span>
        <span style="font-size: 2rem;">25.4亿</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.asset_distribution_wrapper {
  top: 4vw;
  right: 2vw;
  width: 24vw;
  height: 18vw;
}
</style>
