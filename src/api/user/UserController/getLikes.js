import Vue from 'vue';

export function getLikes(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getLikes",
    params: {
      username: username
    }
  })
}
