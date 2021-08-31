<template>
  <div class="my-fans">
    <div class="search">
      <div class="search-box">
        <div class="search">
          <input type="text" class="search-input" :changeValue="changeValue" v-model="input"
                 :placeholder="'请输入用户名'">
          <img src="../../assets/img/iconNew/search.png" alt="search" class="search-img">
        </div>
      </div>
    </div>
    <div class="oneFans" v-for="(item,index) in fans1">
      <el-avatar :size="60" :src="item.pictureUrl" @click="toOtherUser(item.username)"></el-avatar>
      <span class="username">{{item.username}}</span>
      <el-button type="primary" @click="toLove(item.username)" v-if="isLove">取消关注</el-button>
      <el-button type="primary" @click="toLove(item.username)" v-else>关注</el-button>
    </div>
  </div>
</template>

<script>
  import {getFocusList} from "../../api/user/FocusController/getFocusList";
  import SearchBox from "../header/SearchBox";
  import {getUserFocus} from "../../api/user/FocusController/getUserFocus";
  import {deleteUserFocus} from "../../api/user/FocusController/deleteUserFocus";
  import {getIsFocus} from "../../api/user/FocusController/getIsFocus";
  import {allTags} from "../../api/user/BlogController/allTags";

  export default {
    name: "MyAttention",
    components: {
      SearchBox
    },
    data() {
      return {
        input: "",
        fans: [],
        fans1: [],
        isLove: true,
      }
    },

    computed: {
      changeValue: function (e) {
        // let value = this.input
        this.getValue(this.input)
        return this.input
      },
    },
    methods: {
      getValue: function (input) {
        this.fans1 = this.fans.filter(data => !input || data.username.toLowerCase().includes(input.toLowerCase()))
      },
      toOtherUser(username) {
        console.log(123121111111111111)
        this.$router.push({
          path: "/user/InfoForOthers", query: {
            username: username
          }
        })
      },
      toLove(username) {
        if (this.isLove) {
          this.cancelFocus(username)
          this.isLove = !this.isLove
        } else {
          this.focus(username)
          this.isLove = !this.isLove
        }
      },
      focus(username) {
        getUserFocus(username).then(res => {
          console.log("getUserFocus", res)
          if (res.data.code === 200) {
          } else {
          }
        }).catch(err => {
          console.log(err)
        });
      },
      cancelFocus(username) {
        getUserFocus(username).then(res => {
          console.log("getUserFocus", res)
          if (res.data.code === 200) {
          } else {
          }
        }).catch(err => {
          console.log(err)
        });
      },
    },
    created() {
      getFocusList(this.$store.state.username).then(res => {
        console.log("getFocusList", res)
        if (res.data.code === 200) {
          this.fans = res.data.data
          this.fans1 = res.data.data
        } else {

        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
</script>

<style lang="scss" scoped>
  $oneFans-height: 80px;
  .my-fans {
    width: 100%;
    height: 100%;
    transition: width 2s;
    overflow: hidden;
    text-align: center;

    .search {
      width: 100%;
      height: 100px;
      line-height: 100px;
      position: relative;

      .search-box {
        position: absolute;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .oneFans {
      width: 70.3125vw;
      height: $oneFans-height;
      line-height: $oneFans-height;
      border-radius: 20px;
      background-color: #fff;
      margin: 20px auto;
      position: relative;

      .el-avatar {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }

      .username {
        left: 100px;
        position: absolute;
      }

      .el-button {
        right: 28px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .oneFans:hover {
      background-color: rgba(255, 252, 252, 0.8);
    }
  }

  .search-box {
    height: var(--header-height);
    line-height: var(--header-height);

    .search {
      display: flex;
      background-color: #fff;
      border-radius: 50px;
      border: 1px solid var(--color-main);
      width: 300px;
      height: 35px;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      .search-img {
        width: 20px;
        height: 20px;
        margin: auto;
        cursor: pointer;
      }

      .search-input {
        width: 200px;
        border-radius: 10px;
        outline-style: none;
        border: none;
        margin: 0 auto;
        height: 30px;
      }
    }

    div.search:hover {
      border: 1px solid var(--color-main);
    }
  }
</style>
