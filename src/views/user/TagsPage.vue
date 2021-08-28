<template>
  <div>
    <HeaderBar></HeaderBar>
    <div class="search-box">
      <div class="searchBar">
        <h2>{{this.$route.query.tag}}</h2>
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
  import Empty from "../../components/common/Empty";
  import ShowFrame from "../../components/common/ShowFrame";
  import Pagination from "../../components/common/Pagination";
  import HeaderBar from "../../components/header/HeaderBar";
  import {getTagsDetail} from "../../api/user/BlogController/getTagsDetail";
  export default {
    name: "TagsPage",
    components:{
      Pagination,
      ShowFrame,
      HeaderBar,
      Empty
    },
    data(){
      return {
        tag:this.$route.query.tag,
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
        getTagsDetail(this.pageSize,this.currPage,this.tag).then(res=>{
          console.log("getTagsDetail",res)
          if (res.status===200){
            if(res.data.code===200){
              this.allSearched=res.data.data
            }else {
            }
          }else {
          }
        }).catch(err=>{
          console.log(err)
        });
      }
    },
    created() {
      //申请所有页码
      console.log(1111111)
      // getTagsDetail(this.pageSize,this.tag,).then(res=>{
      //   console.log(222222222)
      //   console.log('所有页码',res)
      //   if(res.status===200){
      //     this.total = res.data.allPagesCount;
      //     console.log("申请搜索页总页码成功");
      //   }
      // }).catch(err=>{
      //   if(err.status!==200){
      //     console.log("申请搜索页总页码失败");
      //   }
      // });
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
