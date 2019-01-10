<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <!-- 图表 -->
    <div id="main" style="width: 600px;height:400px;"></div>

  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.initEcharts();
  },
  methods:{
    initEcharts() {
       // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  }

}
</script>

<style>
.mcard {
  height: 100%;
}
</style>
