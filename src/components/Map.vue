<template>
  <div class="map-view-container">
    <div id="viewDiv">
      <div id="map-container">
      </div>
    </div>
  </div>
</template>

<script>
//import {loadCss, loadModules} from 'esri-loader'
import {loadModules} from 'esri-loader';

export default {
  name: 'Map',
  data() {
    return {
      msg: 'hello vue',

      //引入顺序最好遵循官网，顺序错误可能会导致部分功能无法使用
      modules: ["esri/Map", 'esri/WebMap', "esri/widgets/Locate",
        "esri/widgets/Track", "esri/layers/TileLayer", 'esri/views/MapView', "esri/Graphic",
        "esri/layers/GraphicsLayer", "esri/layers/FeatureLayer",
        "esri/PopupTemplate", "esri/widgets/Locate", "esri/widgets/Track", "esri/widgets/Sketch",
      ],
      view: "",
      gisConstructor: {},
      map: {}
    };
  },
  mounted() {
    loadModules(this.modules, {css: true}).then(this.loading)
  },
  methods: {
    loading(args) {
      console.log(args)
      for (let k in args) {
        let name = this.modules[k].split('/').pop()
        name = name.replace(name[0], name[0].toUpperCase())
        this.gisConstructor[name] = args[k];
      }
      // 官方地图
      // this.map = new this.gisConstructor.Map({
      //   basemap: "streets",
      // });
      // 切片地图
      var mapTileLayer = new this.gisConstructor.TileLayer({
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer"
      });
      this.map = new this.gisConstructor.Map({
        layers: [mapTileLayer]
      });
      // 创建地图
      // this.map=new this.gisConstructor.WebMap({
      //         portalItem:{
      //             id:"00f90f3f3c9141e4bea329679b257142"
      //         }
      //   });

      //  创建view视图
      this.view = new this.gisConstructor.MapView({
        container: "map-container",
        map: this.map,
        center: [-118, 34],
        zoom: 6
      });
      var graphicsLayer = new this.gisConstructor.GraphicsLayer();
      var sketch = new this.gisConstructor.Sketch({
        view: this.view,
        layer: graphicsLayer
      });
      //工具栏
      this.view.ui.add(sketch, "top-right");

      //sketch.on("create", function(event) {
      //  console.log(event,"event")
      // });
      //新版本地图点击事件，旧版本为map.on("click",this.clickHandler)
      this.view.on("click", function (e) {

        var xy = [Math.round(e.mapPoint.longitude * 1000) / 1000, Math.round(e.mapPoint.latitude * 1000) / 1000]   //转换经纬度
        console.log(xy, "gg")

        let restbtn = document.getElementsByClassName("restxuandian")[0]
        console.log(restbtn)
        // restbtn.style.cursor="pointer"

      })
      this.getdata()
    },

    getdata() {
      // 假设xyarr为后台接口返回的数据
      let xyarr = [{x: "-118", y: "34", name: "aaa", mag: "-118/34", id: "1"},
        {x: "-118.806", y: "34", name: "bbb", mag: "-118.806/34", id: "2"},
        {x: "-118.906", y: "36", name: "ccc", mag: "-118.806/40", id: "3"},
      ]

      xyarr.forEach(item => {
        // 标记点的位置
        var point = {
          type: "point",
          longitude: item.x,
          latitude: item.y
        };

        // 设置点的样式
        var simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // orange
          outline: { //外边框
            color: [255, 255, 255], // white
            width: 1
          }
        };
        //  设置弹出框模板
        var popupTemplate = new this.gisConstructor.PopupTemplate({
          "title": item.name,
          "content": "我说这是线，你有意见吗？<br/>这不应该是点吗？<br/>嗯！！！啪！你再说一遍<br/><span>" + item.mag + "</span> <span class='restxuandian' value='" + item.id + "' style='display:block;background:#409EFF;margin:10px 10px 0 0;padding:6px;border-radius:3px;width:80px;color:#fff;cursor:pointer;'>重新选点</span>"
        })
        //
        var pointGraphic = new this.gisConstructor.Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
          popupTemplate: popupTemplate

        });
        //  设置线
        var polyline = {
          type: "polyline",
          paths: [
            [-113, 34],
            [-114, 33],
            [-112, 35]
          ]
        }
        var popupTemplateline = new this.gisConstructor.PopupTemplate({
          "title": "这是点",
          "content": "对对,你说的都对,你说是啥就是啥"
        })
        var simpleLineSymbol = {
          type: "simple-line",
          color: [226, 119, 40], // orange
          width: 2
        };

        var polylineGraphic = new this.gisConstructor.Graphic({
          geometry: polyline,
          symbol: simpleLineSymbol,
          popupTemplate: popupTemplateline,
        })


        //  多边形
        var polygon = {
          type: "polygon",
          rings: [
            [-118, 36],
            [-117, 34],
            [-116, 35],
            [-115, 35],
            [-114, 35]
          ]
        };
        var popupTemplatefill = new this.gisConstructor.PopupTemplate({
          "title": "我说这是多边形,你没意见吧",
          "content": "滚犊子,你再说一遍是啥,别逼我干你...... <br/>额... <br/> 你再说一遍你想干什么 <br/> 嘿嘿嘿，没事，我是说你是最棒的 ，，。，"
        })
        var simpleFillSymbol = {
          type: "simple-fill",
          color: [227, 139, 79, 0.2],  // orange, opacity 80%
          outline: {
            color: [255, 0, 0],
            width: 1
          }
        };

        var polygonGraphic = new this.gisConstructor.Graphic({
          geometry: polygon,
          symbol: simpleFillSymbol,
          popupTemplate: popupTemplatefill
        });

        var graphicsLayer = new this.gisConstructor.GraphicsLayer();
        this.map.add(graphicsLayer);
        graphicsLayer.add(pointGraphic)
        graphicsLayer.add(polylineGraphic);
        graphicsLayer.add(polygonGraphic);
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#viewDiv{
  position: absolute;
  width: calc(100% - 218px);
  height: calc(100% - 102px);
  top: 68px;
  left: 208px;
  border-style: solid;
  border-width:3px;
}
#map-container{
  height: 100%;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
