<template>
  <el-card class="sale">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <div class="header-right">
        <span @click="getDay">本日</span>
        <span @click="getWeek">本周</span>
        <span @click="getMonth">本月</span>
        <span @click="getYear">本年</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          style="width: 250px; margin-left: 20px"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="17">
          <div class="saleCharts" ref="saleCharts"></div>
        </el-col>
        <el-col style="height: 300px" :span="7">
          <h4>门店{{ title }}排名</h4>
          <ul style="list-style: none">
            <li>
              <span class="black">0</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span class="black">1</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span class="black">2</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span>3</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span>97680</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import day from "dayjs";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      activeName: "销售额",
      myCharts: "",
      date: [],
    };
  },
  computed: {
    title() {
      return this.activeName;
    },
  },
  methods: {
    // 点击今日按钮获取今日事件
    getDay(){
      let startDay = dayjs().format('YYYY-MM-DD')
      this.date = [startDay,startDay]
    },
    // 获取周
    getWeek(){
      const startWeek = dayjs().day(1).format('YYYY-MM-DD')
      const endWeek = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [startWeek,endWeek]
    },
    //获取月份
    getMonth(){
      const startMonth= dayjs().startOf('month').format('YYYY-MM-DD')
      const endMonth = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [startMonth,endMonth]
    },
    // 获取年份
    getYear(){
      const startYear= dayjs().startOf('year').format('YYYY-MM-DD')
      const endYear = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [startYear,endYear]
    }
  },
  watch: {
    activeName() {
      this.myCharts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.saleCharts);
    this.myCharts.setOption({
      title: {
        text: "销售额趋势",
      },
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 24, 67, 87, 54, 100],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.sale {
  margin: 20px 0;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.header-right {
  position: absolute;
  right: 70px;
}
.header-right span {
  margin: 0 10px;
}
.saleCharts {
  width: 100%;
  height: 300px;
}
ul li {
  margin: 10px 0;
}
ul li span {
  margin: 0 6px;
}
ul li span:first-child {
  float: left;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
ul li span:last-child {
  float: right;
}
ul li .black {
  float: left;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  background: black;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>