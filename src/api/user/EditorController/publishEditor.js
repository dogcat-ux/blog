import Vue from 'vue';

export function publishEditor(title, content, firstPicture, draft, userName, typeId) {
  // title, content, firstPicture, draft, userName, typeName
  var params = new FormData();
  params.append('title', title);
  params.append('content', content);
  params.append('firstPicture', firstPicture);
  params.append('draft', draft);
  params.append('username', userName);
  params.append('typeId', typeId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/publishEditor",
    data: params
  })
}
