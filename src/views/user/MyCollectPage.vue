<template>
  <div>
    <HeaderBar></HeaderBar>
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

<style scoped>

</style>
