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
        <router-link to="searchMap" key="searchMap">
          <el-menu-item index="searchMap">
            <i class="el-icon-location"></i>
            <span slot="title">查询景点</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">路线规划</span>
        </template>
        <router-link to="routemap" key="routeMap">
          <el-menu-item index="routemap">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">地铁路径规划</span>
          </el-menu-item>
        </router-link>
        <router-link to="searchMap" key="searchMap">
          <el-menu-item index="/drawmap">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">路径查询</span>
          </el-menu-item>
        </router-link>
        <router-link to="baiduMap" key="baiduMap">
          <el-menu-item index="/map">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">地标路径</span>
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
        <router-link to="diagramSurround" key="diagramSurround">
          <el-menu-item index="diagramSurround">
            <i class="el-icon-tickets"></i>
            <span slot="title">周边POI图表</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-link"></i>
          <span slot="title">外链</span>
        </template>
        <el-menu-item index="" :key="urls[0]">
          <i class="el-icon-link"></i>
          <a :href="urls[0]" target="_blank">永庆坊</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[1]">
          <i class="el-icon-link"></i>
          <a :href="urls[1]" target="_blank">陈氏宗祠</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[2]">
          <i class="el-icon-link"></i>
          <a :href="urls[2]" target="_blank">粤剧艺术博物馆</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[3]">
          <i class="el-icon-link"></i>
          <a :href="urls[3]" target="_blank">中山纪念堂</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[4]">
          <i class="el-icon-link"></i>
          <a :href="urls[4]" target="_blank">镇海楼</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[5]">
          <i class="el-icon-link"></i>
          <a :href="urls[5]" target="_blank">西汉南越王博物馆</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[6]">
          <i class="el-icon-link"></i>
          <a :href="urls[6]" target="_blank">广州塔</a>
        </el-menu-item>
        <el-menu-item index="" :key="urls[7]">
          <i class="el-icon-link"></i>
          <a :href="urls[7]" target="_blank">天河体育中心</a>
        </el-menu-item>
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
      urls: [
        "https://baike.baidu.com/item/%E6%B0%B8%E5%BA%86%E5%9D%8A/20604110?fr=aladdin",
        "https://baike.baidu.com/item/%E9%99%88%E5%AE%B6%E7%A5%A0%E5%A0%82/4242579?fromtitle=%E9%99%88%E5%AE%B6%E7%A5%A0&fromid=1364077&fr=aladdin",
        "https://baike.baidu.com/item/%E7%B2%A4%E5%89%A7%E8%89%BA%E6%9C%AF%E5%8D%9A%E7%89%A9%E9%A6%86/4822702?fr=aladdin",
        "https://baike.baidu.com/item/%E4%B8%AD%E5%B1%B1%E7%BA%AA%E5%BF%B5%E5%A0%82/4323?fr=aladdin",
        "https://baike.baidu.com/item/%E9%95%87%E6%B5%B7%E6%A5%BC/2205",
        "https://baike.baidu.com/item/%E8%A5%BF%E6%B1%89%E5%8D%97%E8%B6%8A%E7%8E%8B%E5%8D%9A%E7%89%A9%E9%A6%86/1786642?fromtitle=%E5%8D%97%E8%B6%8A%E7%8E%8B%E5%8D%9A%E7%89%A9%E9%A6%86&fromid=14724371&fr=aladdin",
        "https://baike.baidu.com/item/%E5%B9%BF%E5%B7%9E%E5%A1%94/1951402?fr=aladdin",
        "https://baike.baidu.com/item/%E5%A4%A9%E6%B2%B3%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83/10230243?fr=aladdin"
      ],


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

a:link {
  color: white;
}

a:visited {
  color: lightgray;
}

a:hover {
  color: lightgray;
}

a:active {
  color: #ccc;
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
  min-height: 800px;
  text-decoration: none;
  overflow-y: hidden;
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
