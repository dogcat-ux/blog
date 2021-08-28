import Vue from 'vue';

export function clearFirstComment(id) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/clearFirstComment",
    params: {
      id: id
    }
  })
}
