<template>
  <el-container class="message-center">
    <el-header height="52px">
      <HeaderBar></HeaderBar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar style="width: 100%">
          <div class="message-center-title">
          </div>
          <ul>
            <li @click="replyMe" v-if="isReplyMeActive" class="active">回复我的</li>
            <li @click="replyMe" v-else>回复我的</li>
            <!--            <li>私聊</li>-->
            <li @click="likeMe" v-if="isLikeMeActive" class="active">收到的赞/收藏</li>
            <li @click="likeMe" v-else>收到的赞/收藏</li>
<!--            <li>新增关注</li>-->
          </ul>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="message-center-main">
          <transition name="fade">
            <component :is="mainContent"></component>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HeaderBar from "../../components/header/HeaderBar";
  import OneMessage from "../../components/MessageCenter/OneMessage";
  import CommentMe from "../../components/MessageCenter/CommentMe";
  import LikeMe from "../../components/MessageCenter/LikeMe";
  export default {
    name: "MessageCenter",
    components:{
      HeaderBar,
      OneMessage,
      CommentMe,
      LikeMe,
    },
    data(){
      return{
        mainContent:"CommentMe",
        isReplyMeActive:true,
        isLikeMeActive:false
      }
    },
    methods:{
      replyMe(){
        this.mainContent="CommentMe";
        this.isReplyMeActive=true
        this.isLikeMeActive=false
      },
      likeMe(){
        this.mainContent="LikeMe"
        this.isLikeMeActive=true
        this.isReplyMeActive=false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message-center{
    min-height: 100vh;
    height: auto;
    padding: 0;
    position: relative;

    .el-header{
      padding: 0;
      position: fixed;
      height: var(--header-height);
      margin: 0;
      z-index: 200;
    }
    .el-aside{
      position: fixed;
      padding: 56px 0 0 0;
      height: 100vh;
      color: #ffffff;
      background-color: var(--color-main);
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
        }
        li:hover{
          color: var(--color-font-active);
        }
        .active{
          color: var(--color-font-active);
        }

      }
    }
    .el-container{
      padding: 0;
      min-height: 100vh;
      height: auto;
      width: 100%;
      background-color: var(--color-main);
      /*background-color: var(--color-bac);*/
    }
    .el-main{
      overflow: hidden;
      margin: var(--header-height) 0 0 200px;
      min-height: 100vh;
      height: auto;
      background-color: var(--color-bac);
      text-align: center;
      border-top-left-radius: 50px;
      /*height: 100vh;*/
      .center-one-message{
        /*margin: 25px auto;*/
        margin: 0 auto;
      }
      .message-center-main{
        height: 100%;
      }
    }
  }
</style>
