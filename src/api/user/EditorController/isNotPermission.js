import Vue from 'vue';

export function isNotPermission(phone) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/isNotPermission",
  })
}
