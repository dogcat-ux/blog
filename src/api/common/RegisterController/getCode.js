import Vue from 'vue';

export function getCode(phone) {
  var params = new FormData();
  params.append('phone', phone);
  return Vue.prototype.$http({
    method: 'post',
    url: "/getCode",
    data: params
  })
}
