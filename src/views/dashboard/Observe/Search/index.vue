<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span><i class="el-icon-more"></i></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="main">
        <Card />
        <Card />
      </div>
      <div class="bottom">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
        >
          <el-table-column prop="date" label="排名"  width="80" type="index">
          </el-table-column>
          <el-table-column prop="name" label="搜索关键字"  width="width">
          </el-table-column>
          <el-table-column prop="name" label="用户数" sortable width="width">
          </el-table-column>
          <el-table-column prop="周涨幅" sortable label="地址" width="width">
          </el-table-column>
          
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import Card from "./Card/index.vue";
export default {
  name: "Search",
  data(){
    return {
        tableData:[]
    }
  },
  components: {
    Card,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.main {
  display: flex;
  justify-content: space-between;
}
</style>