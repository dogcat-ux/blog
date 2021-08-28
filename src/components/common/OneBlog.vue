<template>
  <div class="one-blog">
      <div class="one-blog-header">
        <div class="img-box" @click="toOtherUser">
          <el-avatar :size="65" class="avatar" :src="avatarUrl"></el-avatar>
        </div>
        <div class="text-box">
          <slot name="username"></slot>
          <slot name="date"></slot>
        </div>
      </div>
      <div class="one-blog-main" @click="toDetail">
        <slot name="title"></slot>
        <slot name="content"></slot>
      </div>
      <div class="common-footer">
        <CommonFooter :blogId="blogId" :likes="likes">
          <slot name="views" slot="views"></slot>
          <!--        <slot name="likes" slot="likes"></slot>-->
          <slot name="collects" slot="collects"></slot>
          <slot name="comments" slot="comments"></slot>
        </CommonFooter>
      </div>
    </div>
</template>

<script>
  import CommonFooter from "./CommonFooter";

  export default {
    name: "OneBlog",
    components: {
      CommonFooter
    },
    data() {
      return {
        isCollect: true,
      }
    },
    props: {
      avatarUrl: String,
      blogId: Number,
      username: String,
      likes: Number,
      // isLike: Number,
      // isCollect: Number,
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: "/user/DetailPage", query: {
            blog_id: this.blogId
          }
        })
      },
      toOtherUser(){
        this.$router.push({
          path: "/user/InfoForOthers", query: {
            username: this.username
          }
        })
      },
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  $one-blog-width: 1000px;
  $one-blog-height: 300px;
  $one-blog-header-height: 100px;
  $one-blog-main-width: 800px;
  $one-blog-main-height: 150px;
  $img-width: 110px;
  .one-blog {
    width: $one-blog-width;
    height: $one-blog-height;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 auto;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    overflow: hidden;
    color: #303133;
    transition: .3s;

    .one-blog-header {
      display: flex;
      width: $one-blog-width;
      height: $one-blog-header-height;
      line-height: $one-blog-header-height;

      .img-box {
        width: 110px;
        height: $one-blog-header-height;
        line-height: $one-blog-header-height;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        /deep/ .el-avatar {
          margin: auto;
          width: $img-width;
          height: $img-width;
        }
      }

      .text-box {
        flex: 1;
        text-align: left;
        display: flex;
        height: $one-blog-header-height;
        flex-direction: column;
        justify-content: center;

        span:first-child {
          font-size: var(--font-18);
          padding-top: 20px;
        }

        span {
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
      text-align: left;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
      cursor: pointer;
    }

    .common-footer {
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }
  .one-blog:hover{

  }
</style>
