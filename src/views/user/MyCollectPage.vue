<template>
  <div>
    <HeaderBar class="header-collect"></HeaderBar>
    <MyCollect></MyCollect>
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
</style>
