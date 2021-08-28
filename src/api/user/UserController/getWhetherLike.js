import Vue from 'vue';

export function getWhetherLike(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getWhetherLike",
    params:{
      username:Vue.prototype.$store.state.username,
      blogId:blogId
    }
  })
}
