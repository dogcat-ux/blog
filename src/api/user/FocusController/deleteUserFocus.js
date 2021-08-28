import Vue from 'vue';

export function deleteUserFocus(username,fans) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/deleteUserFocus",
    params: {
      //被关注者
      username:username,
      //粉丝名
      fans:fans,
    }
  })
}
