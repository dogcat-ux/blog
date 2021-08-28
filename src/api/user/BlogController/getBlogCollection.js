import Vue from 'vue';

export function getBlogCollection(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getBlogCollection",
    params: {
      username:Vue.prototype.$store.state.username,
      blogId: blogId
    }
  })
}
