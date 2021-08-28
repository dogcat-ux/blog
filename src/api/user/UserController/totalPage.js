import Vue from 'vue';

export function totalPage(query,pageSize) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/totalPage",
    params: {
      pageSize:pageSize,
      query:query,
    }
  })
}
