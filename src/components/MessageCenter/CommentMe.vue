<template>
  <div class="comment-me">
    <div v-for="(item,index) in messagesAdd">
      <OneMessage :avatarUrl="item.userPicture">
        <span slot="username">{{item.valuerName}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="comment-content">{{item.content}}</div>
        <div slot="blog-content" class="blog-content">
          <el-card shadow="never">
            {{item.username}}:{{blogContent[index]}}
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
            this.messagesAdd = res.data.data.map((value, index, arr) => {
              getBlogDetail(value.blogId).then(res1 => {
                console.log("getBlogDetail", res1)
                this.blogContent.append(res1.data.data.content)
                value["blogContent"] = res1.data.data.content
              }).catch(err => {
                console.log(err)
              });
              return value
            })
          } else {
            this.$message.error("失败")
          }
        } else {
          this.$message.error("可能出了点问题")
        }
      }).catch(err => {
        console.log(err)
      });
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
  }
</style>
