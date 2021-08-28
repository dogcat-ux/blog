import Vue from 'vue';

export function getFocusList(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getFocusList",
    params: {
      //粉丝名
      username:username,
    }
  })
}
