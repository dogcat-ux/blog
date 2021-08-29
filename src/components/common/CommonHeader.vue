<template>
  <div class="one-blog-header">
    <div class="img-box" @click="toOtherUser">
      <el-avatar :size="65" class="avatar" :src="avatarUrl"></el-avatar>
    </div>
    <div class="text-box">
      <span class="username">{{username}}</span>
      <span class="date">{{date}}</span>
    </div>
  </div>
</template>

<script>
// <!--  $emit出toOtherUser通过头像跳转他人主页，传入avatarUrl头像地址，username用户名字，date发表日期-->
  export default {
    name: "CommonHeader",
    methods:{
      toOtherUser(){
        this.$emit("toOtherUser")
      }
    },
    props:{
      avatarUrl:String,
      username:String,
      date:String
    }
  }
</script>

<style lang="scss" scoped>
  $one-blog-width: 1000px;
  $one-blog-height: 300px;
  $img-width: 110px;
  $one-blog-header-height: 100px;
  .one-blog-header {
    display: flex;
    width: $one-blog-width;
    height: $one-blog-header-height;
    line-height: $one-blog-header-height;

    .img-box {
      width: 110px;
      height: $one-blog-header-height;
      line-height: $one-blog-header-height;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      /deep/ .el-avatar {
        margin: auto;
        width: $img-width;
        height: $img-width;
      }
    }

    .text-box {
      flex: 1;
      text-align: left;
      display: flex;
      height: $one-blog-header-height;
      flex-direction: column;
      justify-content: center;

      span:first-child {
        font-size: var(--font-18);
        padding-top: 20px;
      }

      span {
        flex: 1;
        height: $one-blog-header-height/2;
        line-height: $one-blog-header-height/2;
      }
    }
  }
</style>
