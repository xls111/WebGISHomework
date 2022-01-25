<template>
  <div class="sidebar">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu default-active="2"
             class="el-menu-vertical"
             :collapse="isCollapse"
             @open="handleOpen"
             @close="handleClose"
             router
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <!--            <el-submenu v-for="item in items" :index="item.name" :key="item.path">-->
      <!--              <template slot="title">-->
      <!--                <i :class="item.icon"></i>-->
      <!--                <span v-text="item.name"></span>-->
      <!--              </template>-->
      <!--              <router-link :to="item.path" :key="item.name">-->
      <!--                <el-menu-item :index="item.name">-->
      <!--                  <i :class="item.icon"></i>-->
      <!--                  <span v-text="item.name"></span>-->
      <!--                </el-menu-item>-->
      <!--              </router-link>-->
      <!--            </el-submenu>-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">地标查询</span>
        </template>
        <router-link to="basemap" key="basemap">
          <el-menu-item index="/basemap">
            <i class="el-icon-location"></i>
            <span slot="title">功能一</span>
          </el-menu-item>
        </router-link>
        <router-link to="drawmap" key="drawmap">
          <el-menu-item index="/drawmap">
            <i class="el-icon-location"></i>
            <span slot="title">功能二</span>
          </el-menu-item>
        </router-link>
        <router-link to="map" key="map">
          <el-menu-item index="/map">
            <i class="el-icon-location"></i>
            <span slot="title">功能三</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">路线规划</span>
        </template>
        <router-link to="routemap" key="routemap">
          <el-menu-item index="routemap">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">地铁路径查询</span>
          </el-menu-item>
        </router-link>
        <router-link to="drawmap" key="drawmap">
          <el-menu-item index="/drawmap">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">功能二</span>
          </el-menu-item>
        </router-link>
        <router-link to="map" key="map">
          <el-menu-item index="/map">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">功能三</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">信息管理</span>
        </template>
        <router-link to="siteTable" key="siteTable">
          <el-menu-item index="siteTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">地标信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="restaurantTable" key="restaurantTable">
          <el-menu-item index="restaurantTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">餐饮信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="accommodationTable" key="accommodationTable">
          <el-menu-item index="accommodationTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">住宿信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="educationTable" key="educationTable">
          <el-menu-item index="educationTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">教育信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="entertainTable" key="entertainTable">
          <el-menu-item index="entertainTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">娱乐信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="financeTable" key="financeTable">
          <el-menu-item index="financeTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">金融信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="marketTable" key="marketTable">
          <el-menu-item index="marketTable">
            <i class="el-icon-s-tools"></i>
            <span slot="title">商场信息</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span slot="title">空间分析</span>
        </template>
        <router-link to="basemap" key="basemap">
          <el-menu-item index="/basemap">
            <i class="el-icon-s-custom"></i>
            <span slot="title">功能一</span>
          </el-menu-item>
        </router-link>
        <router-link to="drawmap" key="drawmap">
          <el-menu-item index="/drawmap">
            <i class="el-icon-s-document"></i>
            <span slot="title">功能二</span>
          </el-menu-item>
        </router-link>
        <router-link to="map" key="map">
          <el-menu-item index="/map">
            <i class="el-icon-s-custom"></i>
            <span slot="title">功能三</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">统计图表</span>
        </template>
        <router-link to="diagramAll" key="diagramAll">
          <el-menu-item index="diagramAll">
            <i class="el-icon-tickets"></i>
            <span slot="title">地标图表</span>
          </el-menu-item>
        </router-link>
        <router-link to="wordCloud" key="wordCloud">
          <el-menu-item index="wordCloud">
            <i class="el-icon-tickets"></i>
            <span slot="title">词云</span>
          </el-menu-item>
        </router-link>
        <router-link to="map" key="map">
          <el-menu-item index="/map">
            <i class="el-icon-tickets"></i>
            <span slot="title">功能三</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-link"></i>
          <span slot="title">外链</span>
        </template>
        <router-link to="basemap" key="basemap">
          <el-menu-item index="/basemap">
            <i class="el-icon-link"></i>
            <span slot="title" @click="hrefClick">一</span>
          </el-menu-item>
        </router-link>
        <router-link to="drawmap" key="drawmap">
          <el-menu-item index="/drawmap">
            <i class="el-icon-link"></i>
            <span slot="title">二</span>
          </el-menu-item>
        </router-link>
        <router-link to="map" key="map">
          <el-menu-item index="/map">
            <i class="el-icon-link"></i>
            <span slot="title">三</span>
          </el-menu-item>
        </router-link>

      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Side",
  data() {
    return {
      isCollapse: false,
      url: "https://cn.bing.com/"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    hrefClick() {
      window.location.href = this.url;//当前标签页
      window.open("https://cn.bing.com/", '_blank');//打开一个新的标签页
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

/*.sidebar {*/
/*  position: absolute;*/
/*  top: 50px;*/
/*  left: 0px;*/
/*  bottom: 0px;*/
/*  background-color: #545c64;*/
/*}*/
.el-menu-vertical:not(.el-menu--collapse) {
  width: 210px;
  min-height: 760px;
  text-decoration: none;
}

/*.el-menu-vertical {*/
/*  width: 210px;*/
/*  min-height: 760px;*/
/*  text-decoration: none;*/
/*}*/

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
