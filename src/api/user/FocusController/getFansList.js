import Vue from 'vue';

export function getFansList(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getFansList",
    params: {
      //粉丝名
      username:username,
    }
  })
}
