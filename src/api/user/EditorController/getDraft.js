import Vue from 'vue';

export function getDraft(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getDraft",
    params: {
      username:username
    }
  })
}
