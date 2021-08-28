import Vue from 'vue';

export function getUserCollection(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getUserCollection",
    params: {
      username:username
    }
  })
}
