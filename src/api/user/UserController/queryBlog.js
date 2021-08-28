import Vue from 'vue';

export function queryBlog(query,pageNum,pageSize) {
  let params = new FormData();
  params.append('query', query);
  params.append('pageSize', pageSize);
  params.append('pageNum', pageNum);
  return Vue.prototype.$http({
    method: 'post',
    url: "/queryBlog",
    data:params
  })
}
