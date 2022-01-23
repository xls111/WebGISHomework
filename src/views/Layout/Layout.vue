<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container>
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

</style>
