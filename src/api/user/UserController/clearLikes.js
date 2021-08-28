import Vue from 'vue';

export function clearLikes(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/clearLikes",
    params: {
      username:username
    }
  })
}
