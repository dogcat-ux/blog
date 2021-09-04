<template>
  <div class="user-page">
    <!--    左边-->
    <HeaderBar class="header-bar2"></HeaderBar>
    <div class="main">
      <transition name="el-fade-in-linear">
          <div class="info" v-if="isFold===0">
            <UserInfo class="user-info"></UserInfo>
          </div>
      </transition>
   <!--    右边-->
      <el-main>
        <el-scrollbar style="width: 100%;height: 100%">
        <div class="main-content" >
          <ul>
            <i class="el-icon-s-fold icon-size" v-if="isFold===0" @click="isFold=1"></i>
            <i class="el-icon-s-unfold icon-size" v-else-if="isFold===1" @click="isFold=0"></i>
            <li @click="MyNote" ref="MyNote">我发布的笔记</li>
            <li @click="MyCollect" ref="MyCollect">我的收藏</li>
            <li @click="MyDraft" ref="MyDraft">我的草稿</li>
            <li @click="MyLikes" ref="MyLikes">我赞过的</li>
            <li @click="MyAttention" ref="MyAttention">关注</li>
            <li @click="MyFans" ref="MyFans">粉丝</li>
          </ul>
          <div class="main-box">
              <component :is="mainContent"></component>
          </div>
        </div>
        </el-scrollbar>
      </el-main>
    </div>
  </div>
</template>

<script>
  import MyNote from "../../components/userPage/MyNote";
  import MyDraft from "../../components/userPage/MyDraft";
  import MyAttention from "../../components/userPage/MyAttention";
  import MyCollect from "../../components/userPage/MyCollect";
  import MyFans from "../../components/userPage/MyFans";
  import UserInfo from "../../components/userPage/UserInfo";
  import HeaderBar from "../../components/header/HeaderBar";
  import MyLikes from "../../components/userPage/MyLikes";
  export default {
    name: "UserPage",
    components:{
      MyNote,
      MyAttention,
      MyCollect,
      MyFans,
      UserInfo,
      HeaderBar,
      MyDraft,
      MyLikes
    },
    data(){
      return{
        mainContent:"MyNote",
        isFold:0,
      }
    },
    methods:{
      MyNote(){
        this.mainContent='MyNote'
      },
      MyCollect(){
        this.mainContent='MyCollect'
      },
      MyAttention(){
        this.mainContent='MyAttention'
      },
      MyFans(){
        this.mainContent='MyFans'
      },
      MyDraft(){
        this.mainContent='MyDraft'
      },
      MyLikes(){
        this.mainContent='MyLikes'
      }

    }
  }
</script>

<style lang="scss" scoped>
  $user-info-width:300px;
  $min-tab-height:60px;
  .fade-enter-active,.fade-leave-active{
    transition:opacity,.3s;
    opacity:0
  }
  .fade-enter,.fade-leave-to{
    opacity:0
  }
  .user-page{
    width: var(--page-width);
    height: var(--page-height-common);
    overflow: hidden;
    .header-bar2{
      position: fixed;
      z-index: 500;
    }
    .main{
      margin-top: var(--header-height);
      display: flex;
      height: var(--page-height-common);
      .info{
        width: $user-info-width;
        overflow: hidden;
        .user-info{
          width: $user-info-width;
          position: fixed;
        }
      }
      .el-main{
        padding: 0 0 30px 0;
        margin: 0;
        min-height: 100%;
        /*overflow-y: hidden;*/
        background-color: var(--color-bac);
      }
      .main-content{
        transition: width 2s;
        text-align: center;
        height: var(--page-height-common);
        flex: 1;
        ul{
          transition: width 2s;
          line-height: $min-tab-height;
          width: 100%;
          height: $min-tab-height;
          display: flex;
          .el-icon-s-fold{
            cursor: pointer;
            margin: auto;
            /*margin: auto auto auto 30px;*/
            /*font-size: 40px;*/
            color: var(--color-common-icon);
          }
          .el-icon-s-unfold{
            cursor: pointer;
            margin: auto;
            /*margin: auto auto auto 30px;*/
            /*font-size: 40px;*/
            color: var(--color-common-icon);
          }
          li{
            cursor: pointer;
            flex: 1;
            text-align: center;
            height: $min-tab-height;
            line-height: $min-tab-height;
          }
          li:hover{
            color: var(--color-main);
          }
        }
        .main-box{
         width: 100%;
          height: auto;
          min-height: 100vh;
        }
      }
    }
  }
</style>
