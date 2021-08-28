import Vue from 'vue';

export function home(pageSize, pageNum) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/home",
    params: {
      pageSize: pageSize,
      pageNum: pageNum
    }
  })
}
