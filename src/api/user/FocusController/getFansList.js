import Vue from 'vue';

export function getFansList() {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getFansList",
    params: {
      //粉丝名
      username:Vue.prototype.$store.state.username,
    }
  })
}
