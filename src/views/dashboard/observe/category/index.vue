<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div
      slot="header"
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
      "
    >
      <span>销售类别占比</span>
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="chart" ref="chart" style="width: 100%; height: 300px; text-align: center;"></div>
    </div>
    <!-- card body -->
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    let myChart = echarts.init(this.$refs.chart);
    myChart.setOption({
      title: {

        text: 'Search Engine',
        subtext: 1048,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["45%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            // borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });

    myChart.on('mouseover', (params) => {

        // console.log(params);
        const {data: {name, value}} = params;
        myChart.setOption({

            title: {

                text: name,
                subtext: value
            }
        })
    })
  },
};
</script>

<style scoped>
</style>