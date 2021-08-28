<template>
  <div>
    <HeaderBar></HeaderBar>
    <div class="search-box">
      <div class="searchBar">
        <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
        </el-input>
      </div>
      <div v-if="allSearched.length===0">
        <Empty :text="'暂无内容'"></Empty>
      </div>
      <ShowFrame :showArray="this.allSearched" :span-num="6">
        <Pagination
          :page-size="this.pageSize"
          :total="this.total"
          @currentChange="currentChange"
          @requestData="requestData"
          slot="Pagination"
        ></Pagination>
      </ShowFrame>
    </div>
  </div>

</template>

<script>
  // <!--  该页面从路由接受搜索内容-->
  import ShowFrame from "../../components/common/ShowFrame";
  import Pagination from "../../components/common/Pagination";
  import HeaderBar from "../../components/header/HeaderBar";
  import Empty from "../../components/common/Empty";
  import {totalPage} from "../../api/user/UserController/totalPage";
  import {queryBlog} from "../../api/user/UserController/queryBlog";

  export default {
    name: "SearchPage",
    components:{
      Pagination,
      ShowFrame,
      HeaderBar,
      Empty
    },
    data(){
      return {
        searchContent:this.$route.query.searchContent,
        allSearched:[],
        //绑定的
        total:1,
        currPage: 0,
        pageSize: 16,
      }
    },
    methods:{
      //搜索页的搜索
      goSearch(){

      },
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        queryBlog(this.searchContent,this.currPage,this.pageSize).then(res=>{
          console.log(res)
          if(res.data.code===200){
            this.allSearched=res.data.data
          }
        }).catch(err=>{})
      }
    },
    created() {
      //申请所有页码
      totalPage(this.searchContent,this.pageSize).then(res=>{
        console.log('所有页码',res)
        if(res.data.code===200){
          this.total = res.data.data;
          console.log("申请搜索页总页码成功");
        }
      }).catch(err=>{
        if(err.status!==200){
          console.log("申请搜索页总页码失败");
        }
      });
      //申请内容
      this.requestData();
    },
  }
</script>

<style lang="scss" scoped>
  .search-box{
    margin: 20px auto;
    width: 1200px;
  }
</style>
