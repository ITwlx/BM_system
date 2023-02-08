<template>
  <div class="card">
    <div class="header">
      <span>搜索用户数</span>
      <span><i class="el-icon-info"></i></span>
    </div>
    <div class="main">
      <span>17866 &nbsp;&nbsp;&nbsp;</span> &nbsp;
      <span> 17.1</span>
      <i class="el-icon-caret-top" style="color: red"></i>
      <i class="el-icon-caret-bottom" style="color: green"></i>
    </div>
    <div class="bottom" >
        <div class="eCharts" ref="eCharts"></div>
    </div>
  </div>
</template>

<script>
import * as eCharts from 'echarts'
export default {
  name: "SearchCard",
  mounted() {
    let myCharts = eCharts.init(this.$refs.eCharts);
    myCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: {
        type: "line",
        smooth: true,
        data: [12, 34, 56, 34, 21, 66, 75],
        //拐点的样式
        itemStyle: { opacity: 0 },
        //线条的颜色
        lineStyle: {
          color: "purple",
        },
        // 填充颜色
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
                color: "purple", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fff", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      //布局调试
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
  },
};
</script>

<style scoped>
.card {
  width: 50%;
}
.el-icon-info {
  margin-left: 20px;
}
.eCharts{
    width: 100%;
    height: 50px;
}
</style>