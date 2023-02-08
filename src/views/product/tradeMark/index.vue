<template>
  <div>
    <el-button type="primary" @click="showDialog">添加</el-button>
    <!-- 
        data 表格组件将来要展示的数据 数组类型
        border 给表格添加边框
        column
          label 显示标题
          width 宽度
          align 对齐方式
       -->
    <el-table style="width: 100%" :data="list" border>
      <el-table-column
        prop="prop"
        type="index"
        label="序号"
        width="80px"
        align="center"
      />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateDialog(row)"
          >
            修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
          当前第几页 数据总条数 每一页展示条数 连续页码数
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"

          current-page 当前第几页 total 总共多少条数据 page-size 每一页展示的数据 page-sizes 可以设置每一页展示多少数据
          pager-count 总共多少按钮 layout 可以实现分页器布局
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @current-change="getTradeMarkinfo"
      @size-change="handleSizeChange"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :pager-count="9"
      layout="prev, pager, next,jumper,->,sizes,total"
    >
    </el-pagination>

    <!-- 弹出框 -->
    <el-dialog
      :title="tmdata.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- el-form  :model属性：把表单数据搜集到对象身上 将来表单验证也需要这个属性
        rules	表单验证规则  prop
      -->
      <el-form style="width: 80%" :model="tmdata" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmdata.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 在这里收集图片信息不能使用v-model
            action:收集图片的地址
            on-success 收集图片成功会执行一次
            before-upload 收集图片之前会执行
           -->
          <!-- 图片 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmdata.logoUrl" :src="tmdata.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义表单验证规则
    var validatetmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        return callback(new Error("输入2到10位字"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      // 当前页展示数据条数
      limit: 3,
      total: 10,
      list: [],
      dialogFormVisible: false,
      imageUrl: "",
      tmdata: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          // 品牌名称的验证规则
          // required 前面是否必须 message 提示信息 trigger：用户行为设置
          {
            required: true,
            message: "请输入品牌名称",
            trigger: blur,
          },
          { validator: validatetmName, trigger: "blur" },
        ],
        logoUrl: [
          {
            required: true,
            message: "请选择图片",
          },
        ],
      },
    };
  },
  methods: {
    async getTradeMarkinfo(pager = 1) {
      this.page = pager;
      let { limit, page } = this;
      let result = await this.$API.tradeMark.reqTrademarkInfo(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        retuen;
      }
    },
    // 告诉服务器当前页面展示多少数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getTradeMarkinfo();
    },
    // 显示添加logo的Dialog
    showDialog() {
      // 显示框
      this.tmdata = { tmName: "", logoUrl: "" };
      this.dialogFormVisible = true;
    },
    // 修改品牌信息
    updateDialog(row) {
      // row 当前选中的品牌信息
      // 显示框
      this.dialogFormVisible = true;
      // 将已有的品牌信息赋值给tmdata进行展示
      // 利用浅拷贝只把服务器的一层赋值给tmdata
      this.tmdata = { ...row };
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      this.tmdata.logoUrl = res.data;
    },
    //
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加或修改品牌信息
    addorUpdate() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          // 发送请求
          let result = await this.$API.tradeMark.reqAddorUpdateMark(
            this.tmdata
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmdata.id ? "修改成功" : "添加成功",
            });
            this.getTradeMarkinfo(!this.tmdata.id ? "1" : this.page);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌
    deleteTrademark(row) {
      this.$confirm(`请确认是否删除${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.tradeMark.reqDeleteTrademark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTradeMarkinfo(
              this.list.length > 1 ? this.page : this.page - 1
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getTradeMarkinfo();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>