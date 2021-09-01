<template>
  <div class="my-note">
<!--    <Empty v-if="blogAdd.length===0" :text="'暂无内容'"></Empty>-->
    <div v-for="(item,index) in blog" class="one-collect">
      <OneBlog :avatarUrl="item.userPicture" :blogId="item.id" :username="item.username" :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="=title">{{item.title}}</div>
        <div slot="content" v-html="item.content">{{item.content}}</div>
<!--        <span slot="likes">{{item.likes}}</span>-->
        <span slot="views">{{item.view}}</span>
      </OneBlog>
    </div>
    <Empty :text="'暂无数据'" v-if="blog.length===0"></Empty>
  </div>
</template>

<script>
  import Empty from "../common/Empty";
  import {getUserCollection} from "../../api/user/UserController/getUserCollection";
  import OneBlog from "../common/OneBlog";
  import {getBlogDetail} from "../../api/user/BlogController/getBlogDetail";
  import {getUserMess} from "../../api/user/UserController/getUserMess";
  export default {
    name: "MyCollect",
    components:{
      OneBlog,
      Empty
    },
    data(){
      return{
        blog:[],
        blogAdd:[],
      }
    },
    methods:{
      getCollection(){
        getUserCollection(this.$store.state.username).then(res=>{
          console.log("getUserCollection",res)
          if (res.data.code===200){
            this.blog=res.data.data
          }
        }).catch(err=>{

        })
      },
      addCancelLike(whetherLike,item){
        this.getCollection()
      }
    },
    created(){
      this.getCollection()
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    /*background-color: var(--color-main);*/
    background-image: var(--color-img);
    margin: 0 auto;
    padding-top: 20px;
    .one-collect{
      margin: 20px auto;
    }
  }
</style>
