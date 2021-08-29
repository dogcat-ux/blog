<template>
  <ul class="header-nav">
    <el-dropdown v-if="this.$store.state.isLogin" @command="handleCommand">
      <li @click="toUserPage">
        <el-avatar :src="this.$store.state.portraitPath"></el-avatar>
      </li>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">退出登录</el-dropdown-item>
        <el-dropdown-item command="b">切换账户</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <li @click="toLogin" v-else>登录</li>
    <li @click="toCollect">收藏</li>
    <li @click="toMessage">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-badge :is-dot="true" class="item" v-if="notReadNum!==0||likeNotReadNum!==0">消息</el-badge>
          <span class="item" v-else>消息</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="c">
            <el-badge :value="likeNotReadNum" class="item" v-if="likeNotReadNum!==0">收到的赞</el-badge>
            <span v-else>收到的赞</span>
          </el-dropdown-item>
          <el-dropdown-item command="d">
            <el-badge :value="notReadNum" class="item" v-if="notReadNum!==0">新增评论</el-badge>
            <span v-else>新增评论</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li @click="toNote">博客</li>
  </ul>
</template>

<script>
  import {logout} from "../../api/user/UserController/logout";
  import {getComment} from "../../api/user/UserController/getComment";
  import {getLikes} from "../../api/user/UserController/getLikes";

  export default {
    name: "HeaderNav",
    data() {
      return {
        notReadNum: 0,
        likeNotReadNum: 0,
        notReadAll: 0
      }
    },
    components: {},
    methods: {
      toLogout() {
        logout().then(res => {
          console.log("logout", res)
        }).catch()
        sessionStorage.clear();
        location.reload();
        // this.$router.replace('/');
      },
      toLogin() {
        this.$router.push('/login')
      },
      toNote() {
        this.$router.push('/user/MyNotePage')
      },
      toUserPage() {
        this.$router.push('/user/UserPage')
      },
      toMessage() {
        this.$router.push('/user/MessageCenter')
      },
      toCollect() {
        this.$router.push('/user/MyCollectPage')
      },
      handleCommand(command) {
        if (command === "a") {
          this.toLogout()
        } else if (command === "b") {
          this.toLogin()
        }else if(command === "c"){
          this.$router.push('/user/MessageCenter')
        }else if(command === "d"){
          this.$router.push('/user/MessageCenter')
        }
      }
    },
    created() {
      getComment(this.$store.state.username).then(res => {
        console.log("header,getComment", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (!res.data.data[i].isRead) {
                this.notReadNum++
              }
            }
          }
        }
      }).catch(err => {
        console.log(err)
      });
      getLikes(this.$store.state.username).then(res => {
        console.log("header,getLikes", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (!res.data.data[i].isRead) {
                this.likeNotReadNum++
              }
              this.notReadAll = Number(this.notReadNum) + Number(this.likeNotReadNum)
            }
          }
        }
      }).catch(err => {
        console.log(err)
      });
      this.notReadAll = Number(this.notReadNum) + Number(this.likeNotReadNum)
    }
  }
</script>

<style lang="scss" scoped>
  .header-nav {
    color: var(--color-font2);
    width: 35vw;
    height: var(--header-height);
    display: flex;

    li:first-child {
      height: var(--header-height);
      line-height: var(--header-height);
      display: flex;
      align-items: center;
    }

    /deep/ .el-avatar {
      margin: auto;
    }

    li {
      width: 64px;
      height: var(--header-height);
      line-height: var(--header-height);
    }

    li {
      cursor: pointer;
    }

    li:hover {
      color: var(--color-font-active);
    }

  }

  .item {
    display: inline;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: var(--color-font-active);
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
