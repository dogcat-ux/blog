import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function getCodeReflush(phone) {
  var params = new FormData();
  params.append('phone', encrypt(phone));
  return Vue.prototype.$http({
    method: 'post',
    url: "/getCodeReflush",
    data: params
  })
}
