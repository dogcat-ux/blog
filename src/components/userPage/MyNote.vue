<template>
  <div class="my-note">
    <div v-for="(item,index) in blog" class="one-note">
      <OneBlog :avatarUrl="avatar" :blog-id="item.id" :username="item.username" :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="=title">{{item.title}}</div>
        <div slot="content" v-html="item.content">{{item.content}}</div>
<!--        <span slot="likes">{{item.likes}}</span>-->
        <span slot="views">{{item.view}}</span>
      </OneBlog>
    </div>
  </div>
</template>

<script>
  import {getMyBlogs} from "../../api/user/BlogController/getMyBlogs";
  import OneBlog from "../common/OneBlog";
  export default {
    name: "MyNote",
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
        defaultAvatar:this.$global.defaultAvatar,
        avatar:this.$store.state.portraitPath
      }
    },
    computed:{

    },
    created(){
      getMyBlogs(this.$store.state.username).then(res=>{
        console.log("getMyBlogs",res)
        if (res.data.code===200){
          this.blog = res.data.data.filter(item => item.draft===0)
        }
      }).catch(err=>{})
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    background-color: var(--color-main);
    background-image: var(--color-img);
    margin: 0 auto;
    padding-top: 20px;
    .one-note{
      margin: 20px auto;
    }
  }
</style>
