import Vue from 'vue';

export function addComment(userName, blogId, content) {
  var params = new FormData();
  params.append('valuerName', userName);
  params.append('blogId', blogId);
  params.append('content', content);
  return Vue.prototype.$http({
    method: 'post',
    url: "/addComment",
    data: params
  })
}
