<template>
  <div id="wordCloud-wrapper" width="100%">
    <div id="WordCloud" :style="{width: '100%', height: '300px'}" :data="worddata"></div>
    <div id="WordCloud2" :style="{width: '100%', height: '300px'}" :data="site"></div>
  </div>
</template>
<script>
var echarts = require('echarts');
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  name: "wordCloud",
  data() {
    return {
      worddata: [
        {
          name: "风景名胜",
          value: 15000
        },
        {
          name: "科教文化",
          value: 10081
        }, {
          name: "美术馆",
          value: 9386
        },
        {
          name: "图书馆",
          value: 7500
        },
        {
          name: "高等院校",
          value: 7500
        },
        {
          name: "生活服务",
          value: 6500
        },
        {
          name: "购物中心",
          value: 6500
        },
        {
          name: "红色景区",
          value: 4500
        },
        {
          name: "会展中心",
          value: 3000
        },
        {
          name: "体育休闲",
          value: 1800
        },
        {
          name: "娱乐场所",
          value: 1700
        },
        {
          name: "世界遗产",
          value: 1600
        },
        {
          name: "休闲服务",
          value: 1500
        },
        {
          name: "博物馆",
          value: 1200
        },
        {
          name: "档案馆",
          value: 1100
        },
        {
          name: "社区中心",
          value: 900
        },
        {
          name: "天文馆",
          value: 800
        },
        {
          name: "纪念馆",
          value: 700
        },
      ],
      site: [
        {
          name: "广州塔",
          value: 15000
        },
        {
          name: "广州大剧院",
          value: 11000
        },
        {
          name: "天河体育中心",
          value: 9000
        },
        {
          name: "双子塔",
          value: 7500
        },
        {
          name: "中山纪念堂",
          value: 6500
        },
        {
          name: "市长大厦",
          value: 6500
        },
        {
          name: "五羊石像",
          value: 5800
        },
        {
          name: "琶洲展馆",
          value: 5800
        },
        {
          name: "镇海楼",
          value: 4500
        },
        {
          name: "陈家祠",
          value: 3000
        },
        {
          name: "南方大厦",
          value: 3000
        },
        {
          name: "白天鹅宾馆",
          value: 1700
        },
        {
          name: "中信广场",
          value: 1500
        },
        {
          name: "合景国际金融广场",
          value: 1700
        },
        {
          name: "骑楼",
          value: 1300
        },
        {
          name: "圣心大教堂",
          value: 900
        },
        {
          name: "花城广场",
          value: 700
        },
        {
          name: "南海神庙",
          value: 700
        },
      ]
    }
  },
  mounted() {
    this.initChart();
    this.initChart2();
  },
  methods: {
    initChart() {
      var chart = echarts.init(document.getElementById("WordCloud"));
      console.log('lll');
      const option = {
        title: {
          text: "地标类型热点",
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function() {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.worddata
          }
        ]
      };
      chart.setOption(option);
    },
    initChart2(){
      var chart = echarts.init(document.getElementById("WordCloud2"));
      console.log('lll');
      const option = {
        title: {
          text: "地标热点",
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function() {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.site
          }
        ]
      };
      chart.setOption(option);
    }
  }
}
</script>
