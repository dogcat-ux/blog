<template>
  <layout>
    <HeaderBar slot="header"></HeaderBar>
    <div slot="aside">
      <div class="portrait">
        <el-avatar :src="this.portraitPath" :size="100"></el-avatar>
      </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="toUserInfo">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="toUserNote">
            <i class="el-icon-sell"></i>
            <span slot="title">ta发布的笔记</span>
          </el-menu-item>
<!--          <el-menu-item index="3" @click="toUserSelling">-->
<!--            <i class="el-icon-goods"></i>-->
<!--            <span slot="title">ta的在售商品</span>-->
<!--          </el-menu-item>-->
        </el-menu>
    </div>
    <div slot="main">
      <info-others :user="user" v-if="componentId===0" class="info-main"></info-others>
      <OthersNotes v-else-if="componentId===1"></OthersNotes>
<!--      <others-selling-goods v-else></others-selling-goods>-->
    </div>
  </layout>
</template>

<script>
  import OthersNotes from "../../components/infoForOthers/OthersNotes";
  import Layout from "../../components/common/Layout";
  import HeaderBar from "../../components/header/HeaderBar";
  import InfoOthers from "../../components/infoForOthers/InfoOthers";
  import {getUserMess} from "../../api/user/UserController/getUserMess";

  export default {
    name: "InfoForOthers",
    components:{
      HeaderBar,
      Layout,
      InfoOthers,
      OthersNotes
    },
    data() {
      return {
        tabPosition: 'left',
        componentId: 0,
        portraitPath:'',
        user:[]
      };
    },
    methods:{
      toUserInfo(){
        this.componentId = 0
      },
      toUserNote(){
        this.componentId = 1
      },
      toUserSelling(){
        this.componentId = 2
      }
    },
    created() {
      getUserMess(this.$route.query.username).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.portraitPath = res.data.data.pictureUrl;
          this.user=res.data.data;
        }else{
        }
      }).catch(err=>{})
    }
  }
</script>

<style lang="scss" scoped>
  .others-main{
    width: var(--width-main);
    height: 100vh;
  }
  .portrait{
    width: 150px;
    height: 100px;
    text-align: center;
    margin: 50px;
  }
  .sold-main{
    width: var(--view-width);
    margin: 20px auto;
    height: 100vh;
  }
  .info-main{
    width: 500px;
    margin: 100px auto;
    height: 100vh;
  }
</style>
