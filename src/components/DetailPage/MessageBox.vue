<template>
  <el-card class="message-card" shadow="never">
    <div class="input-message">
      <div class="input-box">
        <el-input
          type="textarea"
          autosize
          maxlength="50"
          show-word-limit
          placeholder="请输入留言"
          v-model="messageText">
        </el-input>
      </div>
      <div class="message-btn">
        <el-button type="primary" size="small" @click="emitMessage">发表留言</el-button>
      </div>
    </div>
    <div class="min-message" v-for="(item,index) in messages">
      <div class="img-box">
        <el-avatar :size="50" :src="item.userPicture" @click="toMessager(item,index)" class="avatar"></el-avatar>
        <img :src="item.pictureUrl" alt="">
      </div>
      <div class="name-date">
        <span class="messager">{{item.valuerName}}</span>
        <span class="message-date">{{item.creatTime}}</span>
      </div>
      <div class="content">
        {{item.content}}
      </div>
      <div class="reply">
        <AddLikes :likes="item.likes" @toLike="toLike"></AddLikes>
        <span>回复</span>
      </div>
    </div>
  </el-card>
</template>

<script>
  import AddLikes from "../common/AddLikes";
  import AddCollect from "../common/AddCollect";
  import {getComment} from "../../api/user/CommentController/getComment";
  import {addComment} from "../../api/user/CommentController/addComment";
  import {getCommentDetail} from "../../api/user/CommentController/getCommentDetail";
  import {getUserMess} from "../../api/user/UserController/getUserMess";
  import {updLikes} from "../../api/user/CommentController/updLikes";

  export default {
    name: "MessageBox",
    components:{
      AddLikes,
      AddCollect
    },
    data() {
      return {
        iconColor: this.$global.iconCommonColor,
        // iconCommonColor:this.$global.iconCommonColor,
        // iconActiveColor:this.$global.iconActiveColor,
        messages: [],
        messagesAdd: [],
        messageText: "",
        commentPortraitPath: this.$store.state.portraitPath,
        isLike: false,
      }
    },
    methods: {
      toLike(item, index) {
        if (item.iconColor === this.$global.iconCommonColor) {
          item.iconColor = this.$global.iconActiveColor
        } else {
          item.iconColor = this.$global.iconCommonColor
        }
      },
      toCollect() {
        addCollect(this.$route.query.blog_id).then(res => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.$message.success("添加收藏成功!")
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        });
      },
      emitMessage() {
        // userName评论者
        addComment(this.$store.state.username, this.$route.query.blog_id, this.messageText).then(res => {
          console.log("addComment", res)
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.$message.success("发布评论成功");
              // location.reload();
            } else {
              this.$message.error("发布评论失败");
            }
          } else {
            this.$message.error("发布评论成功");
          }
        }).catch(err => {
          console.log(err)
        });
      },
      toMessager(item, index) {
        this.$router.push({
          path: '/user/InfoForOthers',
          query: {
            username: item.username
          }
        })
      }
    },
    created() {
      getCommentDetail(this.$route.query.blog_id).then(res => {
        console.log("getCommentDetail", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
              this.messages = res.data.data[0]
            // if (res.data.data.length!==0){
            //   this.messages = res.data.data[0]
            //   this.messagesAdd=this.messages.map((value, index, array)=>{
            //     value["iconColor"]=this.iconColor
            //     return value
            //   })
            // }else {
            //   this.messages = res.data.data
            // }
          } else {
          }
        } else {
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
</script>

<style lang="scss" scoped>
  $one-blog-width: 100%;
  $one-blog-height: 550px;
  $one-blog-header-height: 100px;
  $one-blog-main-width: 100%;
  $one-blog-main-height: 400px;
  $one-comment-height: 100px;
  $img-width: 110px;
  .input-message {
    display: flex;
    flex-direction: row;

    .input-box {
      width: 100%;
      padding-right: 20px;
    }
  }

  .min-message {
    display: flex;
    flex-direction: row;
    height: $one-comment-height;
    line-height: $one-comment-height;
    justify-content: flex-start;
    margin: 5px auto;

    .img-box {
      width: 80px;
      height: $one-comment-height;
      line-height: $one-comment-height;
      display: flex;
      justify-content: center;
      align-items: center;

      /deep/ .el-avatar {
        margin: auto;
        width: $img-width;
        height: $img-width;
        cursor: pointer;
      }
    }

    .name-date {
      display: flex;
      flex-direction: column;
      width: 100px;
      height: $one-comment-height;
      line-height: $one-comment-height;

      .messager {
        padding-top: 10px;
        text-align: left;
        line-height: $one-comment-height/2;
        height: $one-comment-height/2;
      }

      .message-date {
        text-align: left;
        line-height: $one-comment-height/3;
        height: $one-comment-height/3;
        font-size: 12px;
      }
    }

    .content {
      width: 800px;
      text-align: left;
    }

    .reply {
      text-align: right;
      padding-right: 10px;
      flex: 1;
      height: $one-comment-height;
      line-height: $one-comment-height;
      cursor: pointer;

      span:first-child {

      }

      svg:first-child:hover {
        color: var(--color-common-icon-active);
      }
    }

    .reply:hover {
      color: var(--color-font-active);
    }
  }
</style>
