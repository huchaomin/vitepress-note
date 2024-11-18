<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-18 14:33:33
 * @Description  :
-->
<script setup lang="ts">
import gsap from 'gsap'
import RefundScroll from './refundScroll/Index.vue'
import RefundRate from './refundRate/Index.vue'
import AssetDistribution from './assetDistribution/Index.vue'
// import RefundType from './refundType/Index.vue'
import RefundTrend from './refundTrend/Index.vue'
import RefundTotal from './refundTotal/Index.vue'
import AssetSize from './assetSize/Index.vue'
import { cameraPositionStartKey } from '@/pages/index/utils/others'

const refundScrollRef = ref<InstanceType<typeof RefundScroll> | null>(null)
const refundRateRef = ref<InstanceType<typeof RefundRate> | null>(null)
const assetDistributionRef = ref<InstanceType<typeof AssetDistribution> | null>(null)
// const refundTypeRef = ref<InstanceType<typeof RefundType> | null>(null)
const refundTrendRef = ref<InstanceType<typeof RefundTrend> | null>(null)
const refundTotalRef = ref<InstanceType<typeof RefundTotal> | null>(null)
const assetSizeRef = ref<InstanceType<typeof AssetSize> | null>(null)

const cameraPositionStartBus = useEventBus(cameraPositionStartKey)

cameraPositionStartBus.on(() => {
  const tl = gsap.timeline()
  tl.addLabel('top', 5)
  tl.addLabel('bottom', 5.5)
  tl.addLabel('head', 6)
  tl.add(
    gsap.to(assetDistributionRef.value!.$el, {
      duration: 2,
      ease: 'circ.out',
      opacity: 1,
      translateX: 0,
    }),
    'top',
  )
  // tl.add(
  //   gsap.to(refundTypeRef.value!.$el, {
  //     duration: 2,
  //     ease: 'circ.out',
  //     opacity: 1,
  //     translateX: 0,
  //   }),
  //   'top',
  // )
  tl.add(
    gsap.to(refundRateRef.value!.$el, {
      duration: 2,
      ease: 'circ.out',
      opacity: 1,
      translateX: 0,
    }),
    'top',
  )
  tl.add(
    gsap.to(refundTrendRef.value!.$el, {
      duration: 2,
      ease: 'circ.out',
      opacity: 1,
      translateX: 0,
    }),
    'bottom',
  )
  tl.add(
    gsap.to(refundTotalRef.value!.$el, {
      duration: 2,
      ease: 'power2.out',
      opacity: 1,
      translateY: 0,
    }),
    'head',
  )
  tl.add(
    gsap.to(assetSizeRef.value!.$el, {
      duration: 2,
      ease: 'power2.out',
      opacity: 1,
      translateY: 0,
    }),
    'head',
  )
})
</script>

<template>
  <div class="page1_wrapper h-full w-full">
    <RefundScroll ref="refundScrollRef"></RefundScroll>
    <AssetDistribution ref="assetDistributionRef"></AssetDistribution>
    <RefundRate ref="refundRateRef"></RefundRate>
    <!-- <RefundType ref="refundTypeRef"></RefundType> -->
    <RefundTrend ref="refundTrendRef"></RefundTrend>
    <RefundTotal ref="refundTotalRef"></RefundTotal>
    <AssetSize ref="assetSizeRef"></AssetSize>
  </div>
</template>

<style scoped>
.page1_wrapper {
  --x-padding: 2.5vw;

  .refund_rate_wrapper,
  .asset_distribution_wrapper,
  .refund_type_wrapper,
  .refund_trend_wrapper {
    width: 20vw;
  }

  .asset_distribution_wrapper {
    left: var(--x-padding);
    opacity: 0;
    transform: translateX(calc(-100% - var(--x-padding)));
  }

  .refund_rate_wrapper,
  .refund_type_wrapper,
  .refund_trend_wrapper {
    right: var(--x-padding);
    opacity: 0;
    transform: translateX(calc(100% + var(--x-padding)));
  }

  .refund_total_wrapper,
  .asset_size_wrapper {
    top: 6.2vw;
    font-size: 2rem;
  }

  .asset_size_wrapper {
    left: calc(var(--x-padding) + 4vw);
  }

  .refund_total_wrapper {
    right: var(--x-padding);
  }

  .refund_trend_wrapper {
    bottom: 5vw;
    height: 20vw;
  }

  .refund_rate_wrapper {
    height: 20vw;
  }

  .refund_rate_wrapper,
  .asset_distribution_wrapper,
  .refund_type_wrapper {
    top: 11vw;
  }
}
</style>
