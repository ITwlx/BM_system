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
      tooltip: {},
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: {
        type: "bar",
        data: [12, 34, 56, 34, 21, 66, 75],
        //布局调试
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
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