<template>
  <el-card shadow="never">
    <div class="detail-blog">
      <div class="one-blog-header">
        <div class="img-box" @click="toOtherUser">
          <el-avatar :size="65" class="avatar" :src="blogOwnerPortraitPath"></el-avatar>
        </div>
        <div class="text-box">
          <span>
            {{oneBlog.username}}
          </span>
          <span>
            {{oneBlog.creatTime}}
          </span>
        </div>
      </div>
      <div class="one-blog-main">
        <h3>{{oneBlog.title}}</h3>
        <div class="content" v-html="oneBlog.content">{{oneBlog.content}}</div>
      </div>
      <CommonFooter :blogId="blog_id" :likes="oneBlog.likes" @toReply="toReply">
<!--        <span slot="likes">{{oneBlog.likes}}</span>-->
<!--        <span slot="views">{{oneBlog.view}}</span>-->
      </CommonFooter>
    </div>
  </el-card>
</template>

<script>
  import {getBlogDetail} from "../../api/user/BlogController/getBlogDetail";
  import {getUserMess} from "../../api/user/UserController/getUserMess";
  import CommonFooter from "../common/CommonFooter";

  export default {
    name: "BlogBox",
    components:{
      CommonFooter
    },
    data(){
      return{
        isCollect:true,
        blogOwnerPortraitPath:"",
        oneBlog:{},
        blog_id:Number(this.$route.query.blog_id),
        isReply:1
      }
    },
    created() {
      getBlogDetail(this.$route.query.blog_id).then(res=>{
        console.log("getBlogDetail",res)
        if (res.status===200){
          if(res.data.code===200){
            this.oneBlog = res.data.data
            getUserMess(res.data.data.username).then(res1=>{
              console.log("getUserMess",res1)
              if(res1.data.code===200){
                this.blogOwnerPortraitPath=res1.data.data.pictureUrl
              }
            }).catch(err=>{
            })
          }
        }
      }).catch(err=>{
        console.log(err)
      });
    },
    methods:{
      toOtherUser(){
        this.$router.push({
          path: "/user/InfoForOthers", query: {
            username: this.oneBlog.username
          }
        })
      },
      toReply(){
        this.isReply=!this.isReply
      }
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
  .detail-blog {
    width: 100%;
    min-height:$one-blog-height;
    height:auto!important;
    background: seashell;

    .one-blog-header {
      display: flex;
      width: $one-blog-width;
      height: $one-blog-header-height;
      line-height: $one-blog-header-height;
      .img-box{
        cursor: pointer;
        width: 110px;
        height:  $one-blog-header-height;
        line-height:  $one-blog-header-height;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/.el-avatar {
          margin: auto;
          width: $img-width;
          height: $img-width;
        }
      }
      .text-box {
        flex: 1;
        text-align: left;
        display: flex;
        height: auto;
        min-height: $one-blog-header-height;
        flex-direction: column;
        justify-content: center;
        span:first-child{
          font-size: var(--font-18);
          padding-top: 20px;
        }
        span{
          flex: 1;
          height: $one-blog-header-height/2;
          line-height: $one-blog-header-height/2;
        }
      }
    }

    .one-blog-main {
      width: $one-blog-width;
      height: $one-blog-main-height;
      padding-left: $img-width;
      cursor: pointer;
      text-align: left;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
      .content{
        margin-top: 10px;
      }
    }

    .one-blog-footer {
      display: flex;

      span {
        flex: 1;
        cursor: pointer;
      }

      .el-icon-star-off {
        font-size: var(--font-icon);
        cursor: pointer;
        color: var(--color-icon);
      }

      .el-icon-star-on {
        font-size: var(--font-icon);
        cursor: pointer;
        color: var(--color-icon);
      }

      .el-icon-edit {
        font-size: var(--font-icon);
        cursor: pointer;
        color: var(--color-icon);
      }
    }
  }
</style>
