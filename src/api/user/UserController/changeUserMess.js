// import Vue from 'vue';
// // userInfo是一个对象{
// // }
// export function changeUserMess(userInfo,avatarUrl) {
//   var params = new FormData();
//   params.append('username', userInfo.username);
//   params.append('sex', userInfo.sex);
//   if (userInfo.signature){
//     params.append('signature', userInfo.signature);
//   }
//   if (userInfo.email){
//     params.append('email', userInfo.email);
//   }
//   if (userInfo.pictureUrl){
//     params.append('pictureUrl', avatarUrl);
//   }
//   return Vue.prototype.$http({
//     method: 'post',
//     url: "/changeUserMess",
//     data: params,
//   })
// }

import Vue from 'vue';
import {encrypt} from "../../encrypt";
// userInfo是一个对象{
// }
export function changeUserMess(userInfo, avatarUrl) {
  let params = {
    username: userInfo.username
  };
  params['sex'] = userInfo.sex;
  // if (userInfo.signature){
  params['signature'] = userInfo.signature;
  // }
  // if (userInfo.email){
  params['email'] = userInfo.email;
  // }
  // if (userInfo.pictureurl){
  params['pictureUrl'] = avatarUrl;
  // }
  return Vue.prototype.$http({
    method: 'post',
    url: "/changeUserMess",
    data: JSON.stringify(params)
  })
}
