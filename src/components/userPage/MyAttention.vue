<template>
  <div class="my-fans">
    <div class="search">
      <SearchBox @toSearch="goSearch" class="search-box"></SearchBox>
    </div>
    <div class="oneFans" v-for="(item,index) in fans">
      <el-avatar  :size="60"></el-avatar>
      <!--      TODO-->
      <span class="username">213</span>
      <el-button type="primary">已关注</el-button>
    </div>
  </div>
</template>

<script>
  import SearchBox from "../header/SearchBox";
  export default {
    name: "MyAttention",
    components:{
      SearchBox
    },
    data(){
      return{
        fans:[1,2,3]
      }
    },
    methods:{
      goSearch(searchContent){
        if(!searchContent){
          this.$message.error('请输入要搜索的相关信息')
        }else{
          // this.$router.push({path:'/SearchPage',query:{
          //     searchContent:searchContent
          //   }})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $oneFans-height:80px;
  .my-fans{
    width: 100%;
    height: 100%;
    transition: width 2s;
    overflow: hidden;
    text-align: center;
    .search{
      width: 100%;
      height: 100px;
      line-height: 100px;
      position: relative;
      background-color: lightgoldenrodyellow;
      .search-box{
        position: absolute;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .oneFans{
      width:  70.3125vw;
      height: $oneFans-height;
      line-height: $oneFans-height;
      border-radius: 20px;
      background-color: #fff;
      margin: 20px auto;
      position: relative;
      .el-avatar{
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }
      .username{
        left: 100px;
        position: absolute;
      }
      .el-button{
        right: 28px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
