import Vue from 'vue';

export function getComment(username) {
  // var params = new FormData();
  // params.append('phone', phone);
  return Vue.prototype.$http({
    method: 'get',
    url: "/getComment",
    params: {
      username:username
    }
  })
}
