<template>
  <div>
    <el-row :gutter="9">
      <el-col :span="6">
        <el-card style="font-size: 14px">
          <Detail title="总销售额" money="6538">
            <template slot="charts">
              <span>
                周同比 56.67%
                <svg
                  style="width: 16px; height: 16px"
                  t="1670239788365"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="10634"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                    fill="#595BB3"
                    p-id="10635"
                  ></path>
                </svg>
              </span>
              <span>
                日同比 19.16
                <svg
                  style="width: 16px; height: 16px"
                  t="1670239886806"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="11623"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                    fill="#595BB3"
                    p-id="11624"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="bottom">
              <div>
                <span>日销售额 ￥12434</span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="访问量" money="6538">
            <template slot="bottom">
              <div>
                <span>日访问量：</span>
                <span>1234</span>
              </div>
            </template>
            <template slot="charts">
                <LineCharts />
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" money="6538">
            <template slot="bottom">
              <div>
                <span>转化率：</span>
                <span>65%</span>
              </div>
            </template>
            <template slot="charts">
                <BarCharts />
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card style="font-size:13px">
          <Detail title="运营活动效果" money="78%">
            <template slot="bottom" >
              <div>
                <span>
                  周同比 12%
                  <svg
                    style="width: 16px; height: 16px"
                    t="1670239788365"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="10634"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                      fill="#595BB3"
                      p-id="10635"
                    ></path>
                  </svg>
                </span>
                <span>
                  日同比 11%
                  <svg
                    style="width: 16px; height: 16px"
                    t="1670239886806"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11623"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                      fill="#595BB3"
                      p-id="11624"
                    ></path>
                  </svg>
                </span>
              </div>
            </template>
            <template slot="charts">
                <Ybar />
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineCharts from './LineCard'
import BarCharts from './BarCard'
import Ybar from './YbarCard/'
export default {
  name: "Card",
  components: { Detail ,LineCharts,BarCharts,Ybar},
};
</script>

<style scoped>
</style>