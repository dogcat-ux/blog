<template>
<!--  <el-container>-->
<!--    <el-header><HeaderBar class="header-bar2"></HeaderBar></el-header>-->
<!--    <el-container>-->
<!--      <el-aside width="200px">-->
<!--        <transition name="el-fade-in-linear">-->
<!--          <div class="info" v-if="isFold===0">-->
<!--            <UserInfo class="user-info"></UserInfo>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </el-aside>-->
<!--      <el-main>-->
<!--        <ul>-->
<!--        <i class="el-icon-s-fold" v-if="isFold===0" @click="isFold=1"></i>-->
<!--        <i class="el-icon-s-unfold" v-else-if="isFold===1" @click="isFold=0"></i>-->
<!--        <li @click="MyNote" ref="MyNote">我发布的笔记</li>-->
<!--        <li @click="MyCollect" ref="MyCollect">我的收藏</li>-->
<!--        <li @click="MyDraft" ref="MyDraft">我的草稿</li>-->
<!--        <li @click="MyLikes" ref="MyLikes">我赞过的</li>-->
<!--        &lt;!&ndash;          <li @click="MyAttention" ref="MyAttention">关注</li>&ndash;&gt;-->
<!--        &lt;!&ndash;          <li @click="MyFans" ref="MyFans">粉丝</li>&ndash;&gt;-->
<!--      </ul>-->
<!--        <div class="main-box">-->
<!--          <transition name="fade">-->
<!--            <component :is="mainContent"></component>-->
<!--          </transition>-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
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
        <div class="main-content" >
          <ul>
            <i class="el-icon-s-fold" v-if="isFold===0" @click="isFold=1"></i>
            <i class="el-icon-s-unfold" v-else-if="isFold===1" @click="isFold=0"></i>
            <li @click="MyNote" ref="MyNote">我发布的笔记</li>
            <li @click="MyCollect" ref="MyCollect">我的收藏</li>
            <li @click="MyDraft" ref="MyDraft">我的草稿</li>
            <li @click="MyLikes" ref="MyLikes">我赞过的</li>
            <!--          <li @click="MyAttention" ref="MyAttention">关注</li>-->
            <!--          <li @click="MyFans" ref="MyFans">粉丝</li>-->
          </ul>
          <div class="main-box">
            <transition name="fade">
              <component :is="mainContent"></component>
            </transition>
          </div>
        </div>
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
    height: var(--page--common);
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
            font-size: 40px;
            color: var(--color-icon);
          }
          .el-icon-s-unfold{
            cursor: pointer;
            margin: auto;
            font-size: 40px;
            color: var(--color-icon);
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
