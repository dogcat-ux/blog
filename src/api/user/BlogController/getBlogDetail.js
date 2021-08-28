import Vue from 'vue';

export function getBlogDetail(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getBlogDetail",
    params: {
      blogId: blogId
    }
  })
}
