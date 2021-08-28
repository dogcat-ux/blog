import Vue from 'vue';

export function allTags() {
  return Vue.prototype.$http({
    method: 'get',
    url: "/allTags",
  })
}
