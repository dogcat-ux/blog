<template>
  <el-pagination
    background
    :current-page.sync="currPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-size="pageSize"
    :pager-count="5"
    layout="prev, pager, next, jumper"
    :total="total*pageSize">
  </el-pagination>
</template>

<script>
  //此组件作为子组件
  //需要从外部传入的参数(通过prop)：
  //1.总页数 2.pageSize
  //需要传出的参数（通过$emit）
  //1.当前页 pageNum 2.请求函数
  export default {
    name: "Pagination",
    props:{
      total: {
        required: true,
        type: Number
      },
      pageSize:Number
    },
    // props:["total","pageSize"],
    data(){
      return{
        // total:3,
        currPage: 1,  //默认第一页
        // pageSize: 16, //默认展示10条数据
      }
    },
    methods: {
      //分页
      getData(){
        this.$emit('requestData');
      },
      handleSizeChange(val) {
        //改变每页显示数量重新请求数据，重置当前页为第一页
        this.pageSize = val;
        this.currPage = 1;
        this.getData()
      },
      handleCurrentChange(val) {
        //点击改变当前页
        this.currPage = val;
        //传出当前页数
        this.$emit('currentChange',val);
        this.getData()
      },
    },
  }
</script>

<style scoped>

</style>
