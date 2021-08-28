<template>
  <div class="detail-page">
    <HeaderBar></HeaderBar>
    <div class="detail-page-main">
      <BlogBox></BlogBox>
      <MessageBox></MessageBox>
    </div>
  </div>
</template>

<script>
  import BlogBox from "../../components/DetailPage/BlogBox";
  import MessageBox from "../../components/DetailPage/MessageBox";
  import HeaderBar from "../../components/header/HeaderBar";

  export default {
    name: "DetailPage",
    components:{
      HeaderBar,
      BlogBox,
      MessageBox
    },
    created() {
      console.log(this.$route.query.blog_id)
      console.log(typeof Number(this.$route.query.blog_id))
    }
  }
</script>

<style lang="scss" scoped>
  .detail-page{
    text-align: center;
    padding: 0 0 10px 0;
    margin: 0;
    min-height:100vh;
    height:auto!important;
    background-color: var(--color-bac);
    .detail-page-main{
      margin: 15px auto;
      width: var(--width-main);
    }
  }
</style>
