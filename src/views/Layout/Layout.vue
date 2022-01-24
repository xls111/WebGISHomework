<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container id="main-wrapper">
        <side></side>
        <el-main>
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
.el-header {
  padding: 0px;
  min-height: 50px;
}
.el-main{
  height:760px;
  padding:0px;
}
#main-wrapper{
  padding:0;
  height:800px;
}
</style>
