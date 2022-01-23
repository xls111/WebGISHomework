<template>
  <!--  <el-row>-->
  <!--    <el-col :span="30">-->
  <!--      <div class="head-wrap"> <icon name="cogs"></icon>Element</div>-->
  <!--    </el-col>-->
  <!--  </el-row>-->
  <div class="app-header">
    <a href="#">
      <img class="header-logo" src="@/assets/logo.png" width="25px"/>
      <span class="header-title">广州市地标景点管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        您好
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="edit"> >修改密码 </el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-operation" command="quit"> >退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: "Header",
  methods:{
    handleCommand(command){
      this.$message(`点击了${command}`)
    }
  }
}
</script>

<style scoped>
.app-header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
/* logo */
.header-logo {
  vertical-align: middle; /* 居中 */
  padding: 0px 10px 0px 40px; /* 上右下左 */
}

/* 文字 */
.header-title {
  position: absolute;
  color: white;
}

/* 下拉菜单 */
.el-dropdown{
  float: right; /* 浮动在右边 */
  margin-right: 40px; /* 靠右40px */
}
/* 系统管理 */
.el-dropdown-link{
  color: white;
  cursor: pointer; /* 鼠标放上去是手的形状 */
}
</style>
