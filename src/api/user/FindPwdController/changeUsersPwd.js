import Vue from 'vue';

export function changeUsersPwd(phone, password) {
  var params = new FormData();
  params.append('phone', phone);
  params.append('password', password);
  return Vue.prototype.$http({
    method: 'post',
    url: "/changeUsersPwd",
    data: params
  })
}
