import Vue from 'vue';

export function getComment(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getComment",
    params: {
      blogId: blogId
    }
  })
}
