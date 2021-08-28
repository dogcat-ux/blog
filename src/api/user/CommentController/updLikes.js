import Vue from 'vue';

export function updLikes(blogId, commentId, likeName) {
  var params = new FormData();
  params.append('blogId', blogId);
  params.append('commentId', commentId);
  params.append('likeName', likeName);
  return Vue.prototype.$http({
    method: 'post',
    url: "/updLikes",
    data: params
  })
}
