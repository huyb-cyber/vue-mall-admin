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
                min: 0,
                max: 100
            },
            yAxis: {

                show: false,
                type: 'category'

            },
            series: [
                {
                    type: 'bar',
                    data: [78],
                    color: 'yellowgreen',
                    barWidth: 10,
                    showBackground: true,
                    backgroundStyle: {

                        color: '#eee'
                    },
                    label: {

                        show: true,
                        formatter: '|',
                        position: 'right',
                        color: 'red' 
                    }
                }
            ],
            grid: {

                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
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