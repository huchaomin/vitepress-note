<!--
 * @Author       : peter peter@qingcongai.com
 * @Date         : 2024-11-14 11:39:55
 * @LastEditors  : peter peter@qingcongai.com
 * @LastEditTime : 2024-11-18 13:40:35
 * @Description  :
-->
<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="container">
      <div class="rotating-div">图谱分析</div>
      <!-- <div class="rotating-div">自然语言处理</div> -->
      <!-- <div class="rotating-div">数据结构化抓取</div> -->
      <!-- <div class="rotating-div">图像自动识别</div> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #3498db;
}

.rotating-div {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  color: white;
  background-color: #3498db;
  border-radius: 10px;
  animation: rotate 10s linear infinite;

  &:nth-child(1) {
    /* top: 0; */

    /* left: 50%; */

    /* transform: translateX(-50%); */
  }

  /* &:nth-child(2) {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &:nth-child(3) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:nth-child(4) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  } */
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translate(0, 0) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translate(0, 0) rotate(-360deg);
  }
}
</style>
