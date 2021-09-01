<template>
  <div class="my-collect-page">
    <HeaderBar class="header-collect"></HeaderBar>
    <div class="my-collect-box">
      <MyCollect></MyCollect>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "../../components/header/HeaderBar";
  import MyCollect from "../../components/userPage/MyCollect";
  export default {
    name: "MyCollectPage",
    components:{
      HeaderBar,
      MyCollect
    }
  }
</script>

<style lang="scss" scoped>
  .header-collect{
    position: fixed;
    z-index: 100;
  }
  .my-collect-page{
   .my-collect-box{
     padding-top: var(--header-height);
   }
  }
</style>
