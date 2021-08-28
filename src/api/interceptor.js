import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from '@/store/index'  //引入store
import router from '@/router'
import Vue from "vue";  //引入router

axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';
let instance = axios.create({

})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    //为请求头加上token
    const token = window.sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.tokenId = token  //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

export default instance
