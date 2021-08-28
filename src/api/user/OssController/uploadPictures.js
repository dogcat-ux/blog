import Vue from 'vue';

export function uploadPictures(files) {
  var params = new FormData();
  params.append('files', files);
  return Vue.prototype.$http({
    method: 'post',
    url: "/oss/uploadPictures",
    data: params,
  })
}
