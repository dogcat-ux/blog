import Vue from 'vue';

export function getTagsDetail(pageSize, pageNum, tags) {
  return Vue.prototype.$http({
    method: 'get',
    url: "/getTagsDetail",
    params: {
      pageSize:pageSize,
      pageNum:pageNum,
      tags:tags,
    }
  })
}
