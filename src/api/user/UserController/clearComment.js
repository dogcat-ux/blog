import Vue from 'vue';

export function clearComment(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/clearComment",
    params: {
      username:username
    }
  })
}
