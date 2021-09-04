<template>
  <layout>
    <HeaderBar slot="header"></HeaderBar>
    <div slot="aside">
      <div class="portrait">
        <el-avatar :src="this.portraitPath" :size="100"></el-avatar>
      </div>
      <el-menu
        :default-active="'1'"
        @select="handleSelect"
        class="el-menu-vertical-demo">
        <el-menu-item index="3" @click="toLove" v-if="nowUser!==routeUser">
          <i class="el-icon-headset"></i>
          <span slot="title" v-if="!isLove">关注ta</span>
          <span slot="title" v-else>取消关注</span>
        </el-menu-item>
        <el-menu-item index="1" @click="toUserInfo">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toUserNote">
          <i class="el-icon-document"></i>
          <span slot="title">ta发布的笔记</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">ta的粉丝</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-office-building"></i>
          <span slot="title">ta的关注</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div slot="main">
      <info-others :user="user" v-if="componentId===0" class="info-main"></info-others>
      <OthersNotes v-else-if="componentId===1"></OthersNotes>
      <OthersFans v-else-if="componentId===4"></OthersFans>
      <OthersAttention v-else-if="componentId===5"></OthersAttention>
    </div>
  </layout>
</template>

<script>
  import OthersFans from "../../components/infoForOthers/OthersFans";
  import OthersAttention from "../../components/infoForOthers/OthersAttention";
  import OthersNotes from "../../components/infoForOthers/OthersNotes";
  import Layout from "../../components/common/Layout";
  import HeaderBar from "../../components/header/HeaderBar";
  import InfoOthers from "../../components/infoForOthers/InfoOthers";
  import {getUserMess} from "../../api/user/UserController/getUserMess";
  import {getUserFocus} from "../../api/user/FocusController/getUserFocus";
  import {deleteUserFocus} from "../../api/user/FocusController/deleteUserFocus";
  import {getIsFocus} from "../../api/user/FocusController/getIsFocus";

  export default {
    name: "InfoForOthers",
    components: {
      HeaderBar,
      Layout,
      InfoOthers,
      OthersNotes,
      OthersFans,
      OthersAttention
    },
    data() {
      return {
        tabPosition: 'left',
        componentId: 0,
        portraitPath: '',
        user: [],
        isLove: false,
        activeIndex: '1',
        nowUser:this.$store.state.username,
        routeUser:this.$route.query.username
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key===4){
          this.componentId = 4
        }else if(key===5){
          this.componentId = 5
        }
      },
      toUserInfo() {
        this.componentId = 0
      },
      toUserNote() {
        this.componentId = 1
      },
      focus() {
        getUserFocus(this.$route.query.username)
      },
      cancelFocus() {
        deleteUserFocus(this.$route.query.username)
      },
      toLove() {
        if (this.isLove) {
          this.cancelFocus()
          this.isLove = !this.isLove
        } else {
          this.focus()
          this.isLove = !this.isLove
        }
      }
    },
    created() {
      getUserMess(this.$route.query.username).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.portraitPath = res.data.data.pictureUrl;
          this.user = res.data.data;
        } else {
        }
      }).catch(err => {
      })
      getIsFocus(this.$route.query.username).then(res => {
        if (res.data.code === 200) {
          this.isLove = res.data.data
        } else {
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
</script>

<style lang="scss" scoped>
  .others-main {
    width: var(--width-main);
    height: 100vh;
  }

  .portrait {
    width: 150px;
    height: 100px;
    text-align: center;
    margin: 50px;
  }

  .sold-main {
    width: var(--view-width);
    margin: 20px auto;
    height: 100vh;
  }

  .info-main {
    width: 500px;
    margin: 100px auto;
    height: 100vh;
  }
</style>
