<template>
  <div class="contentpanel-layout">
    <el-form>

      <el-row>

        <el-col span="8">

          <el-form-item >

            <el-popover placement="bottom-start" :width="width" v-model="visible" trigger="manual">

              <el-table :data="list" :height="height" @row-click="onClickItem1" @row-dblclick="onDblClickSelect">
                <el-table-column property="name" label="选择起点地标"></el-table-column>
                <!-- <el-table-column property="spec" label="规格"></el-table-column>
                <el-table-column property="price" label="价格"></el-table-column> -->
              </el-table>
              <div slot="reference">
                <el-input placeholder="起点" v-model="value1" @focus="handleFocus" @blur="handleBlur"></el-input>
                <!-- <el-input placeholder="终点" v-model="value1" @focus="handleFocus" @blur="handleBlur"></el-input>
                <input type='button' value='开始' @click='searchByStationName1()'/> -->
              </div>
            </el-popover>
          </el-form-item>

        </el-col>

        <el-col span="8">

          <el-form-item>
            <el-popover placement="bottom-start" :width="width" v-model="visible" trigger="manual">
              <el-table :data="list" :height="height" @row-click="onClickItem2" @row-dblclick="onDblClickSelect">
                <el-table-column property="name" label="名称"></el-table-column>
                <!-- <el-table-column property="spec" label="规格"></el-table-column>
                <el-table-column property="price" label="价格"></el-table-column> -->
              </el-table>
              <div slot="reference">
                <el-input placeholder="终点" v-model="value2" @focus="handleFocus" @blur="handleBlur"></el-input>
                <!-- <el-input placeholder="终点" v-model="value1" @focus="handleFocus" @blur="handleBlur"></el-input> -->
                <!-- <input type='button' value='开始' @click='searchByStationName1()'/> -->
              </div>
            </el-popover>

          </el-form-item>

        </el-col>
        <el-col span="2">

          <el-form-item>
            <!-- <input type='button' value='开始' @click='searchByStationName1()'/> -->
            <el-button type="primary" @click="searchByStationName1()">开始步行路径规划</el-button>


          </el-form-item>

        </el-col>

      </el-row>

    </el-form>

    <div style="width:100%;height:760px;border:1px solid gray;margin-left: 0%" id="container"></div>
  </div>
</template>
<script>
import site from '../../views/json/GuangzhouSites.json'
var map;
export default {
  name: 'baiduMap',
  data () {
    return {
      width:600,
      height:200,
      visible: false,
      value1:'',
      value2:'',
      list:site.result,
      from: null,
      to: null,
    }
  },
  mounted(){
    var _this = this;
    map = new BMapGL.Map('container')
    map.centerAndZoom(new BMapGL.Point(113.27, 23.13), 12)
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.addControl(new BMapGL.NavigationControl()) // 添加平移缩放控件
    map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
    map.setTrafficOn();
    var localSearch = new BMapGL.LocalSearch(map);
    localSearch.enableAutoViewport();
  },
  methods:{
    handleFocus(){
      this.visible = true;
    },
    handleBlur(){
      this.visible = false;
    },
    onClickItem1(row){
      console.log("单击选中了一行1");
      console.log(row.name);
      this.value1 = row.name;
      this.visible = false;
    },
    onClickItem2(row){
      console.log("单击选中了一行2");
      console.log(row.name);
      this.value2 = row.name;
      this.visible = false;
    },
    onDblClickSelect(row){
      console.log('选中了一行');
      console.log(row);
      this.value1 = row.name;
      this.visible = false;
    },

    searchByStationName1: function () {
      var _this = this;
      var startAddrr = this.value1;//获得起点地名

      // var startAddrr=site.result[755].name;
      // console.log(site.result);
      var localSearch = new BMapGL.LocalSearch(map);
      localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);//获得起点经纬度坐标
        if (poi != null) { //判断地名是否存在
          console.log('from poi', poi);
          _this.from = poi.point;
          console.log('from', _this.from);
          _this.searchByStationName2();
        }
        else{
          alert("请输入正确的地名！")
        }
      });
      localSearch.search(startAddrr);
    },
    searchByStationName2: function () {
      var _this = this;
      var endAddrr = this.value2; //获得目的地地名
      var localSearch = new BMapGL.LocalSearch(map);
      localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0); //获得目的地经纬度坐标
        if (poi != null) { //判断目的地是否存在
          _this.to = poi.point;
          _this.run();
        }
        else{
          alert("请输入正确的地名！")
        }

      });
      localSearch.search(endAddrr);
    },
    run: function () {
      map.clearOverlays() // 清除地图上所有的覆盖物
      var walking = new BMapGL.WalkingRoute(map) // 创建步行实例
      walking.search(this.from, this.to) // 第一个步行搜索
      let that = this;
      walking.setSearchCompleteCallback(function () {
        console.log('completeCallback start!');
        var pts = walking.getResults().getPlan(0).getRoute(0).getPath() // 通过步行实例，获得一系列点的数组

        var polyline = new BMapGL.Polyline(pts)
        map.addOverlay(polyline)
        console.log('pollyline!', polyline);
        var m1 = new BMapGL.Marker(that.from) // 创建2个marker
        var m2 = new BMapGL.Marker(that.to)
        map.addOverlay(m1)
        map.addOverlay(m2)

        var lab1 = new BMapGL.Label('起点', {position: that.from}) // 创建2个label
        var lab2 = new BMapGL.Label('终点', {position: that.to})
        map.addOverlay(lab1)
        map.addOverlay(lab2)
        console.log('setTimeout!');
        setTimeout(function () {
          map.setViewport([that.from, that.to]) // 调整到最佳视野
        }, 1000)
      })
    }
  }
}
</script>
<style type="text/css" scope>
.contentpanel-layout{
  padding:0;
  min-height:100%;
}
</style>
