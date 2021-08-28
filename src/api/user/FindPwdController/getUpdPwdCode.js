import Vue from 'vue';

export function getUpdPwdCode(phone) {
  var params = new FormData();
  params.append('phone', phone);
  return Vue.prototype.$http({
    method: 'post',
    url: "/getUpdPwdCode",
    data: params
  })
}
