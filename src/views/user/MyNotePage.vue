<template>
  <div class="my-note-page">
    <HeaderBar class="header-collect"></HeaderBar>
    <MyNote></MyNote>
  </div>
</template>

<script>
  import HeaderBar from "../../components/header/HeaderBar";
  import MyNote from "../../components/userPage/MyNote";
  export default {
    name: "MyNotePage",
    components:{
      MyNote,
      HeaderBar
    }
  }
</script>

<style lang="scss" scoped>
  .my-note-page{
    height: auto;
    min-height: 100vh;
    /*padding-bottom: 20px;*/
    /*position: relative;*/
  }
  .header-collect{
    position: fixed;
    z-index: 100;
  }
</style>
