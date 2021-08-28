import Vue from 'vue';

export function getIsCollection(blogId) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getIsCollection",
    params:{
      username:Vue.prototype.$store.state.username,
      blogId:blogId
    }
  })
}
