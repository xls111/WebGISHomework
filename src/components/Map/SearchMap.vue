<template>
  <div class="contentpanel-layout">
    <el-form>

      <el-row>

        <el-col span="8">

          <el-form-item >

            <el-popover placement="bottom-start" :width="width" v-model="visible" trigger="manual">

              <el-table :data="list" :height="height" @row-click="onClickItem1" @row-dblclick="onDblClickSelect">
                <el-table-column property="name" label="选择地标"></el-table-column>
                <!-- <el-table-column property="spec" label="规格"></el-table-column>
                <el-table-column property="price" label="价格"></el-table-column> -->
              </el-table>
              <div slot="reference">
                <el-input placeholder="请选择您要查询的地标" v-model="value1" @focus="handleFocus" @blur="handleBlur"></el-input>
                <!-- <el-input placeholder="终点" v-model="value1" @focus="handleFocus" @blur="handleBlur"></el-input>
                <input type='button' value='开始' @click='searchByStationName1()'/> -->
              </div>
            </el-popover>
          </el-form-item>

        </el-col>


        <el-col span="2">

          <el-form-item>
            <!-- <input type='button' value='查询' @click='searchByStationName1()'/> -->
            <el-button type="primary" @click="searchdibiao()">查询地标</el-button>


          </el-form-item>

        </el-col>

      </el-row>

    </el-form>

    <div style="width:100%;height:760px;border:1px solid gray;margin-left: 0%" id="container"></div>
  </div>
</template>
<script>
import site from '../../views/json/GuangzhouSites.json'
var map

export default {
  name: 'searchMap',
  data () {
    return {
      width:600,
      height:300,
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
    // map.addControl(new BMapGL.NavigationControl()) // 添加平移缩放控件
    // map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
    var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
    var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
    map.addControl(cityCtrl);


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



    searchdibiao: function () {
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
          var m1 = new BMapGL.Marker(_this.from) // 创建2个marker
          map.setViewport([_this.from])

          map.addOverlay(m1)

          //_this.searchByStationName2();
        }
        else{
          alert("请输入正确的地名！")
        }
      });
      localSearch.search(startAddrr);
    },

  }
}
</script>
<style type="text/css" scope>

</style>
