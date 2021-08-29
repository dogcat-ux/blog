<template>
  <el-card :body-style="{ padding: '0px' }">
    <CommonHeader :username="username" :avatarUrl="avatarUrl" :date="'点赞了'"></CommonHeader>
    <img :src="firstPicture" class="image">
    <div style="padding: 14px;">
      <span>{{title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ date }}</time>
      </div>
    </div>
  </el-card>
<!--  <div class="like">-->
<!--    <el-row>-->
<!--      <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
</template>

<script>
  import CommonHeader from "../common/CommonHeader";
  export default {
    name: "OneLike",
    components:{
      CommonHeader
    },
    props:{
      avatarUrl:String,
      username:String,
      date:String,
      title:String,
      firstPicture:String
    }
  }
</script>

<style lang="scss" scoped>
  .like{
    text-align: center;
    padding-left: 25px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    cursor: pointer;
    margin: 20px auto;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    width: 300px;
    height: 264px;
    /deep/ img {
      width: 100%;
      height: 100%;
      margin-top: 32px;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .el-card{
    width: 350px;
  }
</style>
