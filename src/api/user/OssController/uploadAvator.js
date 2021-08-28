import Vue from 'vue';

export function uploadAvator(file) {
  var params = new FormData();
  params.append('file', file);
  return Vue.prototype.$http({
    method: 'post',
    url: "/oss/uploadAvator",
    data: params
  })
}
