import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function register(ruleForm) {
  // var params = new FormData();
  // params.append('phone', ruleForm.phone);
  // params.append('password', encrypt(ruleForm.pass));
  return Vue.prototype.$http({
    method: 'post',
    url: "/register",
    // data:params
    data: JSON.stringify(
      {
        username: ruleForm.username,
        phone: ruleForm.phone,
        password: encrypt(ruleForm.pass),
      }
    )
  })
}
