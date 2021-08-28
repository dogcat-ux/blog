<template>
  <ul class="header-nav">
    <li @click="toUserPage" v-if="this.$store.state.isLogin">
      <el-avatar :src="this.$store.state.portraitPath"></el-avatar>
    </li>
    <li @click="toLogin" v-else>登录</li>
<!--    <li @click="toUserPage">-->
<!--      <el-avatar :src="this.$store.state.portraitPath" class="avatar"></el-avatar>-->
<!--    </li>-->
<!--    <li>-->
<!--      <span @clixck="toLogout"  v-if="this.$store.state.isLogin">退出</span>-->
<!--      <span @click="toLogin" v-else>登录</span>-->
<!--    </li>-->
    <li @click="toCollect">收藏</li>
    <li @click="toMessage"><el-badge is-dot class="item">消息</el-badge></li>
<!--    <li @click="toMessage">消息</li>-->
    <li @click="toNote">博客</li>
<!--    <li>切换账号</li>-->
  </ul>
</template>

<script>
  export default {
    name: "HeaderNav",
    components:{
    },
    methods:{
      toLogout(){

      },
      toLogin(){
        this.$router.push('/login')
      },
      toNote(){
        this.$router.push('/user/MyNotePage')
      },
      toUserPage(){
        this.$router.push('/user/UserPage')
      },
      toMessage(){
        this.$router.push('/user/MessageCenter')
      },
      toCollect(){
        this.$router.push('/user/MyCollectPage')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-nav{
    color: var(--color-font2);
    width: 35vw;
    height: var(--header-height);
    display: flex;
    li:first-child{
      height: var(--header-height);
      line-height: var(--header-height);
      display: flex;
      align-items: center;
    }
    /deep/.el-avatar{
      margin: auto;
    }
    li{
      width: 64px;
      height: var(--header-height);
      line-height: var(--header-height);
    }
    li{
      cursor: pointer;
    }
    li:hover{
      color: var(--color-font-active);
    }

  }
  .item {
    display: inline;
  }
</style>
