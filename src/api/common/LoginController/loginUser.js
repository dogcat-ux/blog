import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function loginUser(phone,password) {
  var params = new FormData();
  params.append('phone', phone);
  params.append('password', encrypt(password));
  return Vue.prototype.$http({
    method: 'post',
    url: "/loginUser",
    data: params
  })
}
