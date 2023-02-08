<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import * as eCharts from "echarts";
export default {
  name: "line",
  mounted() {
    let myCharts = eCharts.init(this.$refs.echarts);
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
        smooth:true,
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
.echarts {
  width: 100%;
  height: 50px;
}
</style>