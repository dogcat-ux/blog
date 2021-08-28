import Vue from 'vue';

export function phoneCheck(phone) {
  var params = new FormData();
  params.append('phone', phone);
  return Vue.prototype.$http({
    method: 'post',
    url: "/phoneCheck",
    data: params
  })
}
