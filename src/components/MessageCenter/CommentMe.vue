<template>
  <div class="comment-me">
    <div v-for="(item,index) in messages">
      <OneMessage :avatarUrl="item.userPicture">
        <span slot="username">{{item.valuerName}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="comment-content">{{item.content}}</div>
        <div slot="blog-content" class="blog-content" @click="toBlog(item.blogId)">
          <el-card shadow="never">
            {{item.username}}: <span class="tittle">{{item.blogTitle}}</span>
          </el-card>
        </div>
      </OneMessage>
    </div>
    <div v-if="messages.length===0">
      <Empty :text="'暂无数据'"></Empty>
    </div>
  </div>
</template>

<script>
  import Empty from "../common/Empty";
  import {getComment} from "../../api/user/UserController/getComment";
  import OneMessage from "./OneMessage";
  import {getBlogDetail} from "../../api/user/BlogController/getBlogDetail";
  import {clearComment} from "../../api/user/UserController/clearComment";

  export default {
    name: "CommentMe",
    data() {
      return {
        messages: [],
        messagesAdd: [],
        blogContent:[]
      }
    },
    components: {
      OneMessage,
      Empty
    },
    created() {
      getComment(this.$store.state.username).then(res => {
        console.log("getComment", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.messages = res.data.data
          } else {
            this.$message.error("失败")
          }
        } else {
          this.$message.error("可能出了点问题")
        }
      }).catch(err => {
        console.log(err)
      });
      clearComment(this.$store.state.username).then(res=>{
        console.log(res)
        if(res.data.code===200){}else {
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    methods:{
      toBlog(blog_id){
        this.$router.push({
          path:"/user/DetailPage",
          query:{
            blog_id:blog_id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment-me {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    /*background-color: saddlebrown;*/
  }
  .blog-content{
    margin-top: 10px;
    height: 151px;
    padding: 10px;
    /*background-color: rgba(255, 255, 255, 0.47);*/
    color: var(--color-font2);
    border-radius: 20px 0 10px 0;
  }
  .el-card{
    color: #8c939d;
    cursor: pointer;
    .tittle{
      margin-left: 5px;
      color: #868686;
      font-weight: bold;
    }
  }
</style>
