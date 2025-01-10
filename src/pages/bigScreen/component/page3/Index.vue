<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 11:39:30
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2025-01-10 11:42:53
 * @Description  :
-->
<template>
  <div class="page2_wrapper flex h-full w-full items-center justify-center">
    <img draggable="false" src="@/pages/bigScreen/assets/svg/page2.svg" alt="" />
  </div>
</template>

<style scoped>
.page2_wrapper {
  &.active {
    pointer-events: auto;
  }

  img {
    width: 53.8vw;
    transform: translate(-0.43vw, 0.3vw);
  }
}
</style>
