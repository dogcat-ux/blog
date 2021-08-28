import Vue from 'vue';

export function getUserFocus(username,fans) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getUserFocus",
    params: {
      //被关注者
      username:username,
      //粉丝名
      fans:fans,
    }
  })
}
