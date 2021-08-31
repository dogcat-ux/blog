import Vue from 'vue';

export function getIsFocus(username) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getIsFocus",
    params: {
      //被关注者
      username:username,
      //粉丝名
      fans:Vue.prototype.$store.state.username
    }
  })
}
