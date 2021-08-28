<template>
  <div class="one-message">
    <div class="one-message-header">
      <div class="img-box">
        <el-avatar :size="65" class="avatar" :src="avatarUrl"></el-avatar>
      </div>
      <div class="text-box">
        <slot name="username"></slot>
        <slot name="date"></slot>
      </div>
    </div>
    <div class="one-message-content">
      <slot name="comment-content"></slot>
      <div class="blog-content">
        <slot name="blog-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OneMessage",
    props:{
      avatarUrl: String,
      blogId: Number,
      // isLike: Number,
      // isCollect: Number,
    },
  }
</script>

<style lang="scss" scoped>
  $one-blog-width: 1000px;
  $one-blog-height: 280px;
  $one-blog-header-height: 100px;
  $one-blog-main-width: 800px;
  $one-blog-main-height: 270px;
  $img-width: 110px;
  .one-message {
    width: $one-blog-width;
    height: $one-blog-height;
    background: var(--color-bac);
    margin: 25px auto;
    border-radius: 10px;

    .one-message-header {
      display: flex;
      width: $one-blog-width;
      height: $one-blog-header-height;
      line-height: $one-blog-header-height;

      .img-box {
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
        height: $one-blog-header-height;
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

    .one-message-content {
      width: $one-blog-width;
      height: $one-blog-main-height;
      padding-left: $img-width;
      text-align: left;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
  }
</style>
