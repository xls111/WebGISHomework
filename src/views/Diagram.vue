<template>
  <div id="echart" width="100%">
      <div id="echart1" style="height: 350px; width: 100%;"></div>
      <div id="echart2" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
// import {
//     option
// } from '../options.js'
import mc from './json/GuangzhouSites.json'
import axios from 'axios';

var echarts = require('echarts');
export default {
  name:'diagramAll',
  mounted: function() {
    this.drawBarChart();
    this.drawpiechart();
    console.log(mc.result.length)
  },
  methods: {
    drawBarChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart1'));

      var liwannum=0;
      var yuexiu=0;
      var haizhu=0;
      var tianhe=0;
      var baiyun=0;
      var huangpu=0;
      var panyu=0;
      var huadu=0;
      var nansha=0;
      var conghua=0;
      var zengcheng=0;


      for(var i=0;i<mc.result.length;i++){
        if(mc.result[i].adname=="从化区")
        {
          conghua=conghua+1;
          //console.log(mc.result[i].adname)
        }
        if(mc.result[i].adname=="荔湾区")
        {
          liwannum++;

        }
        if(mc.result[i].adname=="越秀区")
        {
          yuexiu++;

        }
        if(mc.result[i].adname=="海珠区")
        {
          haizhu++;

        }
        if(mc.result[i].adname=="天河区")
        {
          tianhe++;

        }
        if(mc.result[i].adname=="白云区")
        {
          baiyun++;

        }
        if(mc.result[i].adname=="黄埔区")
        {
          huangpu++;

        }
        if(mc.result[i].adname=="番禺区")
        {
          panyu++;

        }
        if(mc.result[i].adname=="花都区")
        {
          huadu++;

        }
        if(mc.result[i].adname=="南沙区")
        {
          nansha++;

        }
        if(mc.result[i].adname=="增城区")
        {
          zengcheng++;

        }

      }

      // 绘制基本图表
      var option = {
        title: {
          text: '广州市各区地标数量'
        },
        tooltip: {},
        legend: {
          data: ['地标数量']
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
          data: ['荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄浦区','番禺区','花都区','南沙区','从化区','增城区']
        },
        yAxis: {},
        series: [
          {
            name: '地标数量',
            type: 'bar',
            data: [liwannum, yuexiu, haizhu, tianhe, baiyun , huangpu,panyu,huadu,nansha,conghua,zengcheng]
          }
        ]
      };

      myChart.setOption(option); //option是一个详细的配置参数
      // axios
      //     .get("../static/option.json")
      //     .then(res => (
      //         myChart.setOption({
      //             series: [{
      //                 data: res.data.data //用option.json中的数据给data赋值
      //             }]
      //         })
      //     ));
    },
    drawpiechart(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart2'));

      var liwannum=0;
      var yuexiu=0;
      var haizhu=0;
      var tianhe=0;
      var baiyun=0;
      var huangpu=0;
      var panyu=0;
      var huadu=0;
      var nansha=0;
      var conghua=0;
      var zengcheng=0;



      // 绘制基本图表
      var option = {
        title: {
          text: '广州市各类型地标数量'
        },
        tooltip: {},
        legend: {
          data: ['不同类型地标数量']
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
            name: '不同类型地标数量',
            type: 'pie',
            data: [
              {
                value:834,
                name:'风景名胜'
              },
              {
                value:489,
                name:'科教文化场所'
              },
              {
                value:315,
                name:'文化宫'
              },
              {
                value:315,
                name:'图书馆'
              },
              {
                value:186,
                name:'展览馆'
              },
              {
                value:122,
                name:'纪念馆'
              },
              {
                value:98,
                name:'美术馆'
              },
              {
                value:90,
                name:'博物馆'
              },
              {
                value:47,
                name:'社区中心'
              },
              {
                value:43,
                name:'档案馆'
              },
              {
                value:27,
                name:'科技馆'
              },
              {
                value:26,
                name:'生活服务场所'
              },
              {
                value:37,
                name:'政府及事业单位'
              },
              {
                value:14,
                name:'公司'
              },
              {
                value:13,
                name:'休闲场所'
              },
              {
                value:10,
                name:'会展中心'
              },
              {
                value:19,
                name:'旅游景点'
              },

            ]
          }
        ]
      };

      myChart.setOption(option); //option是一个详细的配置参数
      // axios
      //     .get("../static/option.json")
      //     .then(res => (
      //         myChart.setOption({
      //             series: [{
      //                 data: res.data.data //用option.json中的数据给data赋值
      //             }]
      //         })
      //     ));

    }
  }
}
</script>

<style>
#echart {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
