<template>
  <ul class="home-tabs">
    <li v-for="(item,index) in tags" @click="toTagPage(item,index)">{{item.name}}</li>
  </ul>
</template>

<script>
  import {allTags} from "../../api/user/BlogController/allTags";

  export default {
    name: "HomeTabs",
    components:{
    },
    data(){
      return{
        tags:[]
      }
    },
    methods:{
      toTagPage(item,index){
        this.$router.push({path:'/user/TagsPage',query:{
            tag:item.name
          }})
      }
    },
    created() {
      allTags().then(res => {
        console.log("allTags",res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.tags=res.data.data
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
  $tab-height: 30px;
  $tab-blank: 80px;
  .home-tabs{
    width: var(--width-tab);
    margin: $tab-blank auto $tab-blank auto;
    height: $tab-height;
    display: flex;
    vertical-align: middle;
    li{
      margin: auto;
      color: var(--color-font-main);
      flex: 1;
      height: $tab-height;
      line-height: $tab-height;
    }
    li:hover{
      color: var(--color-font-link-active);
      cursor: pointer;
    }
  }
</style>
