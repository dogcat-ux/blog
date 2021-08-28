import Vue from 'vue';

export function getCommentDetail(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getCommentDetail",
    params: {
      blogId: blogId
    }
  })
}
