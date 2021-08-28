import Vue from 'vue';

export function getUserLikes(username) {
  // var params = new FormData();
  // params.append('phone', phone);
  let params = {
    username:username
  }
  return Vue.prototype.$http({
    method: 'get',
    url: "/getUserLikes",
    params: params
  })
}
