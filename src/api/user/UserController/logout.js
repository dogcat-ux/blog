import Vue from 'vue';

export function logout() {
  return Vue.prototype.$http({
    method: 'get',
    url: "/logout",
  })
}
