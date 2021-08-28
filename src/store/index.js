import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //1用户 2管理员
    // isLogin: 0,
    // username:"",
    // email:"",
    // password:"",
    token:window.sessionStorage.getItem('token'),
    isLogin: window.sessionStorage.getItem('isLogin'),
    username:window.sessionStorage.getItem('username'),
    email:window.sessionStorage.getItem('email'),
    // password:window.sessionStorage.getItem('password'),
    userId:window.sessionStorage.getItem('userId'),
    phone:window.sessionStorage.getItem('phone'),
    isAdmin:window.sessionStorage.getItem('isAdmin'),
    portraitPath:window.sessionStorage.getItem('portraitPath'),
  //  AddressExisted和AddressForm的数据传递
    addressTable:{},
  } ,
  mutations: {
    SET_TOKEN:(state, data)=>{
      state.token = data;
      window.sessionStorage.setItem('token', data);
    },
    GET_USERNAEM:(state, data)=>{
      state.username = data;
      window.sessionStorage.setItem('username', data);
    },
    // GET_PASSWORD:(state, data)=>{
    //   state.password = data;
    //   window.sessionStorage.setItem('password', data);
    // },
    GET_ISLOGIN:(state, data)=>{
      state.isLogin = data;
      window.sessionStorage.setItem('isLogin', data);
    },
    GET_EMAIL:(state, data)=>{
      state.email = data;
      window.sessionStorage.setItem('email', data);
    },
    GET_USERID:(state, data)=>{
      state.userId = data;
      window.sessionStorage.setItem('userId', data);
    },
    GET_PHONE:(state, data)=>{
      state.phone = data;
      window.sessionStorage.setItem('phone', data);
    },
    GET_ISADMIN:(state, data)=>{
      state.isAdmin = data;
      window.sessionStorage.setItem('isAdmin', data);
    },
    GET_portraitPath:(state, data)=>{
      state.portraitPath = data;
      window.sessionStorage.setItem('portraitPath', data);
    },
    GET_ADDRESSTABLE:(state, data)=>{
      state.addressTable = data;
    },
  },

  getters : {
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
      if (!state.token) {
        state.token = window.sessionStorage.getItem('token')
      }
      return state.token
    }
  },
  actions: {

  }
})
export default store
