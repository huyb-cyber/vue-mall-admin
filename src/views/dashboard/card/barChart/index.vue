<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'BarChart',
    mounted() {

        let lineChart = echarts.init(this.$refs.charts);
        lineChart.setOption({

            xAxis: {
                show: false,
                type: 'category'
            },
            yAxis: {

                show: false,

            },
            series: [
                {
                    type: 'bar',
                    data: [20, 56, 32, 88, 9, 55, 98, 10],
                    // color: 'cyan'
                }
            ],
            grid: {

                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            tooltip: {}
        })
    }
}
</script>

<style scoped>
.charts{

    width: 100%;
    height: 100%;
}
</style>