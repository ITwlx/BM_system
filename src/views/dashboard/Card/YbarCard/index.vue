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
        show:false,
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        //均分
        type: "category",
      },
      series: {
        type: "bar",
        data: [78],
        color:'pink',
        //柱状图的宽度
        barWidth:10,
        //背景颜色设置
        showBackground:true,
        backgroundStyle:{
            color:'#eee'
        },
        //文本
        label:{
            show:true,
            formatter:'|',
            position:'right'
        },
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