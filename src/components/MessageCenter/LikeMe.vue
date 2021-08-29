<template>
  <div class="like">
    <el-row>
      <el-col :span="6" v-for="(item, index) in likes" :key="index" :offset="index > 0 ? 2 : 0">
        <OneLike :avatarUrl="item.userPicture" :username="item.lname" :title="item.blogTitle" :firstPicture="item.blogPicture"></OneLike>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import OneLike from "./OneLike";
  import {getLikes} from "../../api/user/UserController/getLikes";
  import {clearLikes} from "../../api/user/UserController/clearLikes";

  export default {
    name: "LikeMe",
    components: {
      OneLike
    },
    data() {
      return {
        likes: []
      }
    },
    methods: {},
    created() {
      getLikes(this.$store.state.username).then(res => {
        console.log("header,getLikes", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.likes = res.data.data
          }
        }
      }).catch(err => {
        console.log(err)
      });
      clearLikes(this.$store.state.username).then(res=>{
        console.log(res)
        if(res.data.code===200){}else {
        }
      }).catch(err=>{
        console.log(err)
      });
    }
  }
</script>

<style scoped>

</style>
