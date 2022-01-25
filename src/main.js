// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-awesome/components/Icon'

// 引入样式
import "vue-easytable/libs/theme-default/index.css";
// 引入组件库
import VueEasytable from "vue-easytable";

Vue.use(VueEasytable);

import axios from 'axios'
import Axios from 'axios'
import * as echarts from 'echarts'
Vue.prototype.$ajax = axios
// 设置全局的axios
Vue.prototype.$axios=Axios
// 设置基本路径
Axios.defaults.baseURL='/api'

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI)

Vue.component('icon', Icon)
// 设置post请求的数据类型
Axios.defaults.headers.post['Content-Type']='application/json'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
