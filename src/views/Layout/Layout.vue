<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container id="main-wrapper" style="height: 100%">
        <side></side>
        <el-main style="height: 100%">
          <!--        <router-view></router-view>-->
          <appmain></appmain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import header from "@/views/Layout/Header";
import side from "@/views/Layout/SideBar";
import appMain from "@/views/Layout/AppMain";

export default {
  name: "Layout",
  components: {
    vheader: header,
    side: side,
    appmain: appMain
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
}

.el-header {
  padding: 0px;
  min-height: 50px;
}
.el-aside {
  width: 210px;
}
.el-main{
  height:calc(100% - 60px);
  padding:0;
}
/*#main-wrapper{*/
/*  padding:0;*/
/*  height:800px;*/
/*}*/
</style>
