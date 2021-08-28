<template>
  <div class="my-note">
    <div v-for="(item,index) in blog">
      <OneBlog :avatarUrl="item.userPicture" :blogId="item.id" :username="item.username" :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="=title">{{item.title}}</div>
        <div slot="content">{{item.content}}</div>
<!--        <span slot="likes">{{item.likes}}</span>-->
        <span slot="views">{{item.view}}</span>
      </OneBlog>
    </div>
  </div>
</template>

<script>
  import {getUserLikes} from "../../api/user/UserController/getUserLikes";
  import OneBlog from "../common/OneBlog";
  export default {
    name: "MyLikes",
    components:{
      OneBlog
    },
    data(){
      return{
        blog:[
          {
            id: 567893,
            tit1e: "标题",
            content: "内容们",
            creatTime: "2021-8-11",
            firstPicture: "一个Ur1",
            permission: 1,
            username: "he11o",
            typeId: 1,
            likes: 3,
            view: 2,
            draft: 0
          }
        ],

      }
    },
    created(){
      getUserLikes(this.$store.state.username).then(res=>{
        if (res.data.code===200){
          this.blog=res.data.data
        }
      }).catch(err=>{
      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    margin: 20px auto;
  }
</style>
