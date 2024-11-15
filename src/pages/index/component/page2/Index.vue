<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 11:39:30
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-15 16:32:33
 * @Description  :
-->
<template>
  <div class="page2_wrapper flex h-full w-full items-center justify-center">
    <img draggable="false" src="@/pages/index/assets/svg/page2.svg" alt="" />
  </div>
</template>

<style scoped>
.page2_wrapper {
  &.active {
    pointer-events: auto;
  }

  img {
    width: 79vw;
    transform: translate(0.47vw, -0.6vw);
  }
}
</style>
