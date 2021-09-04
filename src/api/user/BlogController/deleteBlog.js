import Vue from 'vue';

export function deleteBlog(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/deleteBlog",
    params: {
      blogId: blogId
    }
  })
}
