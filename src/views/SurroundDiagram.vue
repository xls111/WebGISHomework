<template>
  <div id="echart" width="100%">
    <div>
      <div id="echart1" style="height: 350px; width: 100%;"></div>
      <div id="echart2" style="height: 400px; width: 100%;"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import mc from "./json/GuangzhouSites.json";

var echarts = require('echarts');

export default {
  name: "SurroundDiagram",
  mounted: function() {
    this.drawBarChart();
    this.drawPieChart();
  },
  methods: {
    drawBarChart(){
      var myChart = echarts.init(document.getElementById('echart1'));
      var data = [4278,9963,18254,7967,26511,8403];
      // 绘制基本图表
      var option = {
        title: {
          text: '广州市地标周边POI数量'
        },
        tooltip: {},
        legend: {
          data: ['周边POI数量']
        },
        gird:{
          left:"50px",
          right:"10px",
          top: 0,
          bottom: 0
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          data: ['酒店住宿', '商场购物', '娱乐设施', '金融理财', '餐饮服务', '教育机构']
        },
        yAxis: {},
        series: [
          {
            name: 'POI数量',
            type: 'bar',
            data: [data[0],data[1], data[2], data[3], data[4],data[5]]
          }
        ]
      };
      myChart.setOption(option); //option是一个详细的配置参数
    },
    drawPieChart(){
      var myChart2 = echarts.init(document.getElementById('echart2'));
      var option = {
        legend: {
          data: ['周边POI南丁格尔图'],
          top:'bottom'
        },
        grid: {
          top:"20px",
          bottom:"0px",
          left:"0px",
          right:"0px",
          borderWidth:1
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name:'周边POI南丁格尔图',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data:[
              { value: 4278, name: '酒店住宿' },
              { value: 9963, name: '商场购物' },
              { value: 18254, name: '娱乐设施' },
              { value: 7967, name: '金融理财' },
              { value: 26511, name: '餐饮服务' },
              { value: 8403 , name: '教育机构' },
            ]
          }
        ]
      };
      myChart2.setOption(option);
    }
  }

}
</script>

<style scoped>

</style>
