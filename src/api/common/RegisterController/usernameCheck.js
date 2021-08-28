import Vue from 'vue';

export function usernameCheck(username) {
  // var params = new FormData();
  // params.append('username', username);
  return Vue.prototype.$http({
    method: 'get',
    url: "/usernameCheck",
    params: {
      username:username
    }
  })
}

