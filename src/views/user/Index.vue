<template>
  <div class="index">
    <!--    头部-->
    <div class="header">
      <HeaderBar></HeaderBar>
    </div>
    <div class="main">
      <!--    首页轮播-->
      <Carousel></Carousel>
      <!--    标签tab栏-->
      <HomeTabs></HomeTabs>
      <!--    热门内容-->
      <HotContent></HotContent>
      <!--    我的关注-->
      <AttentionAndRank></AttentionAndRank>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "../../components/header/HeaderBar";
  import Carousel from "../../components/index/Carousel";
  import HomeTabs from "../../components/index/HomeTabs";
  import HotContent from "../../components/index/HotContent";
  import AttentionAndRank from "../../components/index/AttentionAndRank";
  export default {
    name: "Index",
    components:{
      HeaderBar,
      Carousel,
      HomeTabs,
      HotContent,
      AttentionAndRank
    }
  }
</script>

<style lang="scss" scoped>
  .index{
    text-align: center;
    .header{
    }
    .main{
      /*text-align: center;*/
    }
  }
</style>
