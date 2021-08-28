import Vue from 'vue';

export function getUserMess(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getUserMess",
    params: {
      username: username,
    }
  })
}
