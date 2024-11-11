<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2024-10-26 21:54:57
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-11 18:02:45
 * @Description  :
-->
<script setup lang="ts">
import gsap from 'gsap'
import RefundScroll from './refundScroll/Index.vue'
import RefundUser from './refundUser/Index.vue'
import AssetDistribution from './assetDistribution/Index.vue'
import RefundType from './refundType/Index.vue'
import RefundTrend from './refundTrend/Index.vue'
import RefundTotal from './refundTotal/Index.vue'
import AssetSize from './assetSize/Index.vue'

const refundScrollRef = ref<InstanceType<typeof RefundScroll> | null>(null)
const refundUserRef = ref<InstanceType<typeof RefundUser> | null>(null)
const assetDistributionRef = ref<InstanceType<typeof AssetDistribution> | null>(null)
const refundTypeRef = ref<InstanceType<typeof RefundType> | null>(null)
const refundTrendRef = ref<InstanceType<typeof RefundTrend> | null>(null)
const refundTotalRef = ref<InstanceType<typeof RefundTotal> | null>(null)
const assetSizeRef = ref<InstanceType<typeof AssetSize> | null>(null)

const isMounted = useMounted()

watch(isMounted, (val) => {
  if (val) {
    const tl = gsap.timeline()
    tl.addLabel('top_left', 0)
    tl.addLabel('top_right', 0.5)
    tl.addLabel('bottom_left', 1)
    tl.addLabel('bottom_right', 1.5)
    tl.add(
      gsap.to(assetDistributionRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        translateX: 0,
      }),
      'top_left',
    )
    tl.add(
      gsap.to(refundTypeRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        translateX: 0,
      }),
      'top_right',
    )
    tl.add(
      gsap.to(refundUserRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        translateX: 0,
      }),
      'bottom_left',
    )
    tl.add(
      gsap.to(refundTrendRef.value!.$el, {
        duration: 2,
        ease: 'circ.out',
        translateX: 0,
      }),
      'bottom_right',
    )
  }
})
</script>

<template>
  <div class="page1_wrapper absolute h-full w-full">
    <RefundScroll ref="refundScrollRef"></RefundScroll>
    <AssetDistribution ref="assetDistributionRef"></AssetDistribution>
    <RefundUser ref="refundUserRef"></RefundUser>
    <RefundType ref="refundTypeRef"></RefundType>
    <RefundTrend ref="refundTrendRef"></RefundTrend>
    <RefundTotal ref="refundTotalRef"></RefundTotal>
    <AssetSize ref="assetSizeRef"></AssetSize>
  </div>
</template>

<style scoped>
.page1_wrapper {
  --x-padding: 1.8vw;

  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;

  .refund_user_wrapper,
  .asset_distribution_wrapper,
  .refund_type_wrapper,
  .refund_trend_wrapper {
    width: 23vw;
  }

  .refund_user_wrapper,
  .asset_distribution_wrapper {
    left: var(--x-padding);
    transform: translateX(calc(-100% - var(--x-padding)));
  }

  .refund_type_wrapper,
  .refund_trend_wrapper {
    right: var(--x-padding);
    transform: translateX(calc(100% + var(--x-padding)));
  }

  .asset_size_wrapper {
    right: var(--x-padding);
  }

  .refund_user_wrapper,
  .refund_trend_wrapper {
    bottom: 5vw;
  }
}
</style>
