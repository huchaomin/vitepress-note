<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 11:39:30
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-19 11:03:44
 * @Description  :
-->
<template>
  <div class="page3_wrapper flex h-full w-full items-center justify-center">
    <img draggable="false" src="@/pages/bigScreen/assets/svg/page3.svg" alt="" />
  </div>
</template>

<style scoped>
.page3_wrapper {
  &.active {
    pointer-events: auto;
  }

  img {
    width: 79vw;
    transform: translate(0.47vw, -0.6vw);
  }
}
</style>
