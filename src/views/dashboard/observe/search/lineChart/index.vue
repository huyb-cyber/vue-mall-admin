<template>
  <div>
    <div class="header">
      <span style="margin-right: 20px">搜索用户数</span>
      <svg
        t="1735612483691"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4244"
        width="25"
        height="25"
      >
        <path
          d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
          p-id="4245"
          fill="#bfbfbf"
        ></path>
      </svg>
    </div>
    <div class="main" style="margin-top: 10px">
      <span style="margin-right: 30px">12321</span>
      <span style="margin-right: 10px">17.1</span>
      <svg
        t="1735697087500"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7280"
        width="16"
        height="16"
      >
        <path
          d="M193 320.667 515.149 640.851 834 321Z"
          fill="#1afa29"
          p-id="7281"
        ></path>
      </svg>
      <svg
        t="1735697147933"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="8337"
        width="16"
        height="16"
      >
        <path
          d="M834 640.851 511.851 320.667 193 640.517Z"
          fill="#d81e06"
          p-id="8338"
        ></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts" style="width: 100%; height: 100px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [20, 56, 32, 88, 9],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>