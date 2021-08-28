// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios
// import axios from 'axios'
import instance from "./api/interceptor";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/element-variables.scss'
//vuex
import store from './store/index'
import './assets/css/font.css'
import Global from "./Global";
//animate.css
import animated from 'animate.css'
Vue.use(animated)
Vue.prototype.$store = store;

Vue.prototype.$global = Global;

//创建事件总线
export const eventBus = new Vue()

Vue.use(ElementUI);

Vue.config.productionTip = false

//挂载vue的原型
// Vue.prototype.$http = axios
Vue.prototype.$http = instance

//全局配置
// axios.defaults.baseURL = "/api";
// axios.defaults.headers.post['Content-Type'] = 'application/json';


/* eslint-disable no-new */
new Vue({
  store,
  ElementUI,
  el: '#app',
  router,
  render: h => h(App)
})
