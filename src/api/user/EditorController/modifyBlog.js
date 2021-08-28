import Vue from 'vue';

export function modifyBlog(title, content, firstPicture, userName, typeName) {
  var params = new FormData();
  params.append('title', title);
  params.append('content', content);
  params.append('firstPicture', firstPicture);
  params.append('userName', userName);
  params.append('typeName', typeName);
  return Vue.prototype.$http({
    method: 'post',
    url: "/modifyBlog",
    data: params
  })
}
