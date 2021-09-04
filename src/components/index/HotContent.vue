<template>
  <div class="show2">
    <div class="show2-name">
      <img src="../../assets/img/iconBlog/recomend.png" alt="">
      今日推荐</div>
    <div class="show2-img">
      <div v-for="(item,index) in showGoods" :key="index" class="img-box">
        <el-image :src="item.firstPicture"
                  @click="goGoodDetail(item.id)"
                  class="img-item"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  import {home} from "../../api/user/BlogController/home";
  export default {
    name: "HotContent",
    data() {
      return {
        showGoods: [],
      }
    },
    methods: {
      goGoodDetail(blogId) {
        console.log("blogId",blogId)
        console.log(typeof blogId)
        this.$router.push({
          path: '/user/DetailPage',
          query: {
            blog_id: Number(blogId)
          }
        })
      },
    },
    created() {
      home(6, 0).then(res=>{
        console.log("home",res)
        if (res.data.code===200){
          this.showGoods=res.data.data
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style lang="scss" scoped>

  .show2 {
    text-align: center;
    margin: 20px auto;

    .show2-name {
      margin: 20px auto;
      font-family: DingYongKang;
      font-size: 20px;
      /*background-color: #FD9A16;*/
      /*background-color: #2966C1;*/
      img{
        width: 30px;
        height: 30px;
        border-radius: 10px;
      }
    }
    .show2-img {
      width: var(--width-index);
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      .img-box {
        margin: 16px auto;

        .img-item {
          cursor: pointer;
          margin: 20px auto;
          display: table-cell;
          text-align: center;
          vertical-align: middle;
          overflow: hidden;
          width: 400px;
          height: 264px;
        }

        /deep/ img {
          width: 100%;
          height: 100%;
          margin-top: 32px;
          object-fit: cover;
          border-radius: 5px;
        }
      }
    }
  }
</style>
