<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>报表</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片-->
    <el-card class="box-card">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>

</template>

<script>
import echarts from 'echarts'
// var myChart = echarts.init(document.getElementById('main'));
//
//
// // 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);

export default {
  name: "Report",
  mounted() {
    // 1.基于准备好的dom，初始化echarts实例
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  },
  data() {
    return {
      // 指定图表的配置项和数据
      option : {
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
      }
    }
  },
}
</script>

<style scoped>

</style>