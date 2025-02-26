<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <!--  @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- v-model="value1" -->

          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18" :offset="0">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6" :offset="0">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
              <li>
                <span class="rindex">0</span>
                <span>肯基基</span>
                <span class="rvalue">123</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      date: [],
    };
  },
  computed: {
    title() {
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: `${this.title}趋势`,
        },
        xAxis: {
          data:
            this.title === "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title === "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
          },
        ],
      });
    },
    listState() {
      this.myCharts.setOption({
        xAxis: {
          data: this.listState.orderFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.listState.orderFullYear,
          },
        ],
      });
    },
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: `${this.title}趋势`,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "black", // 可选：设置 Y 轴颜色
            },
          },
          axisTick: {

            show: true
          }
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        },
      ],
    });
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}

ul li {
  height: 8%;
  margin-bottom: 10px;
}

.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  margin-right: 20px;
}

.rvalue {
  float: right;
}
</style>