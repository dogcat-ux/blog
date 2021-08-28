<template>
  <div id="app">
<!--    <PublishNote></PublishNote>-->
<!--    <HeaderBar></HeaderBar>-->
<!--    <UserPage></UserPage>-->
<!--    <Index></Index>-->
<!--    <OneBlog></OneBlog>-->
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import HeaderBar from "./components/header/HeaderBar";
  import UserPage from "./views/user/UserPage";
  import Index from "./views/user/Index";
  import PublishNote from "./views/user/PublishNote";
  import OneBlog from "./components/common/OneBlog";
  export default {
    name: 'App',
    components:{
      Index,
      HeaderBar,
      UserPage,
      PublishNote,
      OneBlog
    }
  }
</script>

<style>
  @import "./assets/css/base.css";

  #app{
    /*height: 100%;*/
    /*margin: 0;*/
    /*padding: 0;*/
  }
</style>
