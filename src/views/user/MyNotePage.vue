<template>
  <div class="my-note-page">
    <HeaderBar class="header-collect"></HeaderBar>
    <div class="my-note-box">
      <MyNote></MyNote>
    </div>
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
  }
  .header-collect{
    position: fixed;
    z-index: 100;
  }
  .my-note-box{
    padding-top: var(--header-height);
  }
</style>
