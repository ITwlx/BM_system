<template>
  <div>
    <el-card class="sale">
      <div class="header" slot="header">
        <div><span>销售类别占比</span></div>
        <div>
          <el-radio-group class="group" v-model="tabPosition">
            <el-radio-button label="top">全部渠道</el-radio-button>
            <el-radio-button label="right">线上</el-radio-button>
            <el-radio-button label="bottom">门店</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="bottom" ref="bottom"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      tabPosition: "top",
    };
  },
  mounted() {
    const myCharts = echarts.init(this.$refs.bottom);
    myCharts.setOption({
      title: {
        text:'视频',
        subtext:1048,
        left:'center',
        top:'center'
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
      //布局调试
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
    myCharts.on('mouseover',(params)=>{
        const {name,value} = params
        myCharts.setOption({
            title:{
                text:name,
                subtext:value
            }
        })
    })
  },
  
};
</script>

<style scoped>
.sale {
  height: 320px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
}
.bottom {
  width: 100%;
  height: 220px;
}
</style>