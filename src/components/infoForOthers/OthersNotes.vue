<template>
  <div class="my-note">
    <div v-for="(item,index) in blog" class="my-note-min">
      <OneMinBlog :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <h3 slot="=title">{{item.title}}</h3>
        <div slot="content" v-html="item.content">{{item.content}}</div>
        <span slot="views">{{item.view}}</span>
      </OneMinBlog>
    </div>
  </div>
</template>

<script>
  import {getMyBlogs} from "../../api/user/BlogController/getMyBlogs";
  import OneBlog from "../common/OneBlog";
  import OneMinBlog from "../common/OneMinBlog";
  export default {
    name: "OthersNotes",
    components:{
      OneBlog,
      OneMinBlog
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
      getMyBlogs(this.$route.query.username).then(res=>{
        if (res.data.code===200){
          this.blog=res.data.data.filter(item=>item.draft===0)
        }
      }).catch(err=>{

      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    margin: 20px auto;
    .my-note-min{
      margin-top: 20px;
    }
  }
</style>
