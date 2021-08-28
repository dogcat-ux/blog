import Vue from 'vue';

export function getMyBlogs(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getMyBlogs",
    params: {
      username:username
    }
  })
}
