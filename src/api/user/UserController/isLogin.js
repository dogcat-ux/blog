import Vue from 'vue';

export function isLogin() {
  return Vue.prototype.$http({
    method: 'get',
    url: "/isLogin",
  })
}
