import Vue from 'vue';

export function getBlogLike(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getBlogLike",
    params: {
      username:Vue.prototype.$store.state.username,
      blogId:blogId
    }
  })
}
