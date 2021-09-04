<template>
  <el-carousel height="600px">
    <el-carousel-item>
      <img src="../../assets/img/home.png" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import {home} from "../../api/user/BlogController/home";

  export default {
    name: "Carousel",
    data(){
      return{
        blogs:[]
      }
    },
    created() {
      home(4, 0).then(res=>{
        if (res.data.code===200){
          this.blogs=res.data.data
        }
      }).catch()
    }
  }
</script>

<style scoped>

</style>
