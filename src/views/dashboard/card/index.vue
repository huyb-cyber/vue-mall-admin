<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span
                >周同比&nbsp;56.67%&nbsp;<svg
                  t="1735613803231"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5390"
                  width="16"
                  height="16"
                >
                  <path
                    d="M834 640.851 511.851 320.667 193 640.517Z"
                    fill="#d81e06"
                    p-id="5391"
                  ></path></svg
              ></span>
              &nbsp;&nbsp;
              <span
                >日同比&nbsp;19.96%&nbsp;
                <svg
                  t="1735614050897"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6998"
                  width="16"
                  height="16"
                >
                  <path
                    d="M193 320.667 515.149 640.851 834 321Z"
                    fill="#1afa29"
                    p-id="6999"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarChart></BarChart>
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart></ProgressChart>
            </template>
            <template slot="footer">
              <span>
                <span
                  >周同比 12%&nbsp;<svg
                    t="1735613803231"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5390"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M834 640.851 511.851 320.667 193 640.517Z"
                      fill="#d81e06"
                      p-id="5391"
                    ></path></svg
                ></span>
                &nbsp;&nbsp;
                <span
                  >日同比 11%&nbsp;
                  <svg
                    t="1735614050897"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6998"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M193 320.667 515.149 640.851 834 321Z"
                      fill="#1afa29"
                      p-id="6999"
                    ></path></svg
                ></span>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "@/views/dashboard/card/detail";
import LineChart from "@/views/dashboard/card/lineChart";
import BarChart from "@/views/dashboard/card/barChart";
import ProgressChart from "@/views/dashboard/card/progressChart";

export default {
  name: "Card",
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart,
  },
};
</script>

<style>
</style>