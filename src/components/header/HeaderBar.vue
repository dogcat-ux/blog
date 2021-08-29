<template>
  <div class="header-bar-box">
    <el-row :gutter="20" class="header-bar" style="margin-left:  0; margin-right: 0;">
      <el-col :span="4" :offset="1">
        <span @click="goHome">首页</span>
        <span @click="goPublish" class="publish-note">发表博客</span>
      </el-col>
      <el-col :span="6" :offset="5">
        <SearchBox class="SearchBox" @toSearch="goSearchPage"></SearchBox>
      </el-col>
      <el-col :span="4" :offset="16">
        <HeaderNav></HeaderNav>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import HeaderNav from "./HeaderNav";
  import SearchBox from "./SearchBox";
  import {getComment} from "../../api/user/UserController/getComment";
  import {getBlogDetail} from "../../api/user/BlogController/getBlogDetail";

  export default {
    name: "HeaderBar",
    data() {
      return {
        notReadNum: 0
      }
    },
    components: {
      SearchBox,
      HeaderNav
    },
    methods: {
      goHome() {
        this.$router.push('/')
      },
      goSearchPage(searchContent) {
        if (!searchContent) {
          this.$message.error('请输入要搜索的相关信息')
        } else {
          this.$router.push({
            path: '/user/SearchPage', query: {
              searchContent: searchContent
            }
          })
        }
      },
      goPublish() {
        this.$router.push('/user/PublishNote')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header-bar-box {
    .header-bar {
      width: var(--header-width);
      height: var(--header-height);
      background-color: var(--color-main);
      position: relative;
      top: 0;
      bottom: 0;
      margin: auto 0;
      overflow: hidden;
      color: var(--color-font2);
      z-index: 200;
      font-size: var(--font-header);

      .el-col {
        position: absolute;
        height: var(--header-height);
        line-height: var(--header-height);

        span:first-child {
          cursor: pointer;
        }

        span:first-child:hover {
          color: var(--color-font-active);
        }
      }

      .SearchBox {
        margin-top: 8px;
      }

      .publish-note {
        font-family: DingYongKang;
        margin-left: 10px;
        cursor: pointer;
      }

      .publish-note:hover {
        color: var(--color-font-active);
      }
    }
  }
</style>
